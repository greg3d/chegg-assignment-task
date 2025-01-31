import {Link} from "react-router-dom"
import {observer} from "mobx-react-lite"
import {Avatar, Box, Grid, Link as ALink, Stack, Typography} from "@mui/material"
import OpenInNewIcon from "@mui/icons-material/OpenInNew"
import GitHubIcon from "@mui/icons-material/GitHub"
import LikeDislike from "./LikeDislike.tsx"
import {useStore} from "../stores/RootStore.ts"

const ProfileRecord = observer(({item}: { item: GenericItem }) => {
    const profile = item as IUserPreview
    const {user} = useStore()
    return (
        <Grid item xs={12} sm={6} md={4} lg={4} xl={3}>
            <Box sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                borderWidth: "1px",
                borderColor: "divider",
                borderStyle: "solid",
                borderRadius: 2,
                p: 1
            }}>
                <Avatar
                    variant={"circular"}
                    src={profile.avatar_url}
                    alt={profile.login}
                    sx={{
                        border: "1px solid divider",
                        borderColor: "divider",
                        boxShadow: "2px 2px 1px #00000055",
                        height: {lg: "80px", xs: "100px"},
                        width: {lg: "80px", xs: "100px"}
                    }}
                />
                <Box sx={{flexGrow: 2, ml: 2, display: "flex", flexDirection: "column"}}>
                    <Typography variant={"h5"} sx={{mb: 1}}>
                        <ALink component={Link} color={"primary"} to={"/user/" + profile.login}>{profile.login}</ALink>
                        <LikeDislike list={user.likes} name={profile.login as string} like={user.like}
                                     dislike={user.dislike}/>
                    </Typography>
                    <Stack direction={"row"} spacing={0.5}>
                        <GitHubIcon color={"secondary"} fontSize={"small"}/>
                        <OpenInNewIcon color={"secondary"} fontSize={"small"}/>
                        <ALink color={"secondary"} href={profile.html_url + "?tab=repositories"} fontSize={14}
                               variant={"body1"}>
                            Profile on Github
                        </ALink>
                    </Stack>
                </Box>
            </Box>
        </Grid>

    )
})

export default ProfileRecord