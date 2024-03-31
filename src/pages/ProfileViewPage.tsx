import {Link, useNavigate, useParams} from "react-router-dom"
import {useProfile} from "../hooks/useProfile.ts"
import useSWR from "swr"
import {fetcherRaw} from "../service/githubApi.ts"
import {observer} from "mobx-react-lite"
import GitHubIcon from "@mui/icons-material/GitHub"
import {
    Avatar,
    Box,
    Button,
    CircularProgress,
    Dialog,
    DialogContent,
    DialogTitle,
    Grid,
    Link as ALink,
    Stack,
    Typography
} from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"
import IconButton from "@mui/material/IconButton"
import PeopleIcon from "@mui/icons-material/People"
import LocationOnIcon from "@mui/icons-material/LocationOn"
import LinkIcon from "@mui/icons-material/Link"
import EmailIcon from "@mui/icons-material/Email"
import ListIcon from "@mui/icons-material/List"
import ApartmentIcon from "@mui/icons-material/Apartment"
import React, {useEffect, useState} from "react"

function NumericParamWithIcon(props: {
    single: string
    plural: string
    icon: React.ElementType
    param: number
}) {
    return <Stack gap={1} direction={"row"} alignItems={"center"}>
        <props.icon/>
        <b>{props.param}</b> {props.param === 0 || props.param > 1 ? props.plural : props.single}
    </Stack>
}

function StringParamWithIcon(props: {
    link: boolean | string | null
    icon: React.ElementType
    param: string | null
}) {

    let linkHref: string = props.link && props.param ? props.param : ""
    if (props.link && typeof props.link === "string") {
        linkHref = props.link
    }

    if (props.param == null) return
    return <Stack gap={1} direction={"row"} alignItems={"center"}>
        <props.icon/>
        {props.link ? <ALink target={"_blank"} href={linkHref}>{props.param}</ALink> : props.param}
    </Stack>
}

function LoadMoreButton() {
    return <Button variant={"outlined"} sx={{mt: 2}}>Load More</Button>
}

const ProfileViewContent = ({profile}: { profile: IUser }) => {

    const [options, setOptions] = useState("?per_page=6 ")
    const [viewMode, setViewMode] = useState<"default" | "repos" | "followers">("default")

    useEffect(() => {
        setViewMode("default")
    }, [])

    const {
        data: followers,
        isLoading: fLoading
    } = useSWR<IUserPreview[]>(() => (profile && profile.followers > 0) ? profile.followers_url + options : null, fetcherRaw)
    const {
        data: repos,
        isLoading: rLoading
    } = useSWR<IRepo[]>(() => (profile && profile.public_repos > 0) ? profile.repos_url + options : null, fetcherRaw)

    if (repos) {
        repos.sort((a, b) => ((new Date(a.created_at) < new Date(b.created_at)) ? 1 : -1))
    }

    return (
        <Box sx={{p: 2}}>
            <Grid container spacing={5}>
                <Grid item xs={12} sm={12} md={3}>
                    <Avatar
                        src={profile.avatar_url}
                        alt={profile.name}
                        variant={"circular"}
                        sx={{
                            border: "1px solid #EEE",
                            borderColor: "divider",
                            boxShadow: "2px 2px 1px #00000055, 20px 20px 50px #00000025",
                            margin: "auto",
                            height: {lg: "auto", xs: "175px", sm: "200px"},
                            width: {lg: "100%", xs: "175px", sm: "200px"},
                            mb: 4
                        }}
                    >
                    </Avatar>
                    <Typography variant={"h4"}>
                        {profile.name}
                    </Typography>
                    <Typography variant={"h5"} sx={{mb: 1}}>
                        <StringParamWithIcon
                            link={profile.html_url}
                            icon={GitHubIcon}
                            param={profile.login}
                        />
                    </Typography>
                    <NumericParamWithIcon
                        single={"follower"}
                        plural={"followers"}
                        icon={PeopleIcon}
                        param={profile.followers}
                    />
                    <StringParamWithIcon
                        link={false}
                        icon={LocationOnIcon}
                        param={profile.location}
                    />
                    <StringParamWithIcon
                        link={false}
                        icon={ApartmentIcon}
                        param={profile.company}
                    />
                    <StringParamWithIcon
                        link={"mailto:" + profile.email}
                        icon={EmailIcon}
                        param={profile.email}
                    />
                    <StringParamWithIcon
                        link={profile.blog === "" ? null : profile.blog}
                        icon={LinkIcon}
                        param={profile.blog === "" ? null : profile.blog}
                    />

                </Grid>

                // Repos
                <Grid item xs={12} sm={6} md={5}>
                    <Typography variant={"h4"}>
                        <ListIcon/> Repositories ({profile.public_repos})
                    </Typography>
                    {!rLoading ?
                        repos && repos.map((item: IRepo) => <div>
                            {(new Date(item.created_at)).toLocaleDateString()}
                            &nbsp;-&nbsp;<ALink href={item.html_url} target={"_blank"}>{item.name}</ALink>
                        </div>)
                        :
                        <CircularProgress/>
                    }
                    {repos && (profile.public_repos > repos.length) && <LoadMoreButton/>}
                </Grid>


                // Followers
                <Grid item xs={12} sm={6} md={4}>
                    <Typography variant={"h4"}>
                        <PeopleIcon/> Followers ({profile.followers})
                    </Typography>
                    {!fLoading ?
                        followers && followers.map((follower) => <Box>
                            <ALink component={Link} color={"primary"}
                                   to={"/user/" + follower.login}>{follower.login}</ALink>
                        </Box>)
                        :
                        <CircularProgress/>
                    }
                    {followers && (profile.followers > followers.length) && <LoadMoreButton/>}
                </Grid>

            </Grid>
        </Box>
    )


}


const ProfileViewPage = observer(() => {

    const {login} = useParams()
    const navigate = useNavigate()
    const {profile, isLoading, isError} = useProfile(login!)

    const handleClose = () => navigate(-1)

    return (
        <Dialog
            aria-labelledby={"profile-view-title-" + login}
            open={true}
            onClose={handleClose}

            maxWidth={"xl"}
            fullScreen={true}
        >
            <DialogTitle sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                fontSize: {md: "2.5rem", sm: "1.5rem"}
            }} id={"profile-view-title-" + login}>
                <Box>
                    Profile <b>{login}</b>
                </Box>

                <IconButton
                    aria-label={"close"}
                    onClick={handleClose}
                >
                    <CloseIcon sx={{fontSize: {xs: "2rem", sm: "2rem", md: "3rem"}, color: "error.main"}}/>
                </IconButton>

            </DialogTitle>


            <DialogContent dividers>
                {isLoading && <CircularProgress/>}
                {isError && <Box sx={{textAlign: "center"}}>ERROR</Box>}
                {profile && <ProfileViewContent profile={profile}/>}
            </DialogContent>
        </Dialog>
    )
})

export default ProfileViewPage