import {Link, useLocation, useNavigate, useParams} from "react-router-dom"
import {useProfile} from "../hooks/useProfile.ts"
import useSWR from "swr"
import {fetcherRaw} from "../service/githubApi.ts"
import {observer} from "mobx-react-lite"
import {
    Box,
    Button,
    CircularProgress,
    Dialog,
    DialogContent,
    DialogTitle,
    Grid,
    Link as ALink,
    Typography
} from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"
import IconButton from "@mui/material/IconButton"
import PeopleIcon from "@mui/icons-material/People"
import ListIcon from "@mui/icons-material/List"
import ProfileHeader from "../components/ProfileHeader.tsx"
import InternalViewPage from "./InternalViewPage.tsx"
import {useCallback} from "react"
import {useStore} from "../stores/RootStore.ts"
import LikeDislike from "../components/LikeDislike.tsx"

function LoadMoreButton({internal}: { internal: string }) {
    return <Link to={internal}><Button variant={"outlined"}>Load more...</Button></Link>
}

export const ProfileViewContent = ({profile}: { profile: IUser }) => {

    const {user} = useStore()

    const def = "?per_page=6&sort=created_at"
    const {
        data: followers,
        isLoading: fLoading
    } = useSWR<IUserPreview[]>(() => (profile && profile.followers > 0) ? profile.followers_url + def : null, fetcherRaw)

    const {
        data: repos,
        isLoading: rLoading
    } = useSWR<IRepo[]>(() => (profile && profile.public_repos > 0) ? profile.repos_url + def : null, fetcherRaw)

    if (repos) {
        repos.sort((a, b) => ((new Date(a.created_at) < new Date(b.created_at)) ? 1 : -1))
    }

    const reposList = <>
        <Typography variant={"h4"}>
            <ListIcon/> Repositories ({profile.public_repos})
        </Typography>
        {!rLoading ?
            repos && repos.map((item: IRepo) => <Box key={item.id}>
                {(new Date(item.created_at)).toLocaleDateString()}
                &nbsp;-&nbsp;<ALink href={item.html_url}
                                    target={"_blank"}>{item.name.length > 20 ? item.name.slice(0, 16) + "..." + item.name.slice(-5, -1) : item.name}</ALink>
            </Box>)
            :
            <CircularProgress/>
        }
        {repos && (profile.public_repos > repos.length) && <LoadMoreButton internal={"repos"}/>}
    </>

    const followersList = <>
        <Typography variant={"h4"}>
            <PeopleIcon/> Followers ({profile.followers})
        </Typography>
        {!fLoading ?
            followers && followers.map((follower) => <Box key={follower.id}>
                <ALink component={Link} color={"primary"}
                       to={"/user/" + follower.login}>{follower.login}</ALink>
                <LikeDislike list={user.likes} name={follower.login as string} like={user.like} dislike={user.dislike}/>
            </Box>)
            :
            <CircularProgress/>
        }
        {followers && (profile.followers > followers.length) &&
            <LoadMoreButton internal={"followers"}/>}
    </>
    return (
        <Box sx={{p: 2}}>
            <Grid container spacing={5}>
                <Grid item xs={12} sm={12} md={3}>
                    <ProfileHeader profile={profile}/>
                </Grid>
                <Grid item xs={12} sm={6} md={5}>
                    {reposList}
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    {followersList}
                </Grid>
            </Grid>
        </Box>
    )
}


const ProfileViewPage = observer(() => {

    const location = useLocation()
    const {internal} = useParams()
    let {login} = useParams()
    const {user} = useStore()
    if (location.pathname === "/my-account") {
        login = user.current?.login
    }
    const navigate = useNavigate()
    const {profile, isLoading, isError} = useProfile(login!)

    const handleClose = useCallback(() => navigate(-1), [])

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
                {profile && !internal && <ProfileViewContent profile={profile}/>}
                {profile && internal && <InternalViewPage profile={profile} internal={internal}/>}
            </DialogContent>
        </Dialog>
    )
})

export default ProfileViewPage