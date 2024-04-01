import {useStore} from "../stores/RootStore.ts"
import {Link, useParams} from "react-router-dom"
import {useProfile} from "../hooks/useProfile.ts"
import {ProfileViewContent} from "./ProfileViewPage.tsx"
import {Box, CircularProgress, Grid, Link as ALink, Stack, Typography} from "@mui/material"
import InternalViewPage from "./InternalViewPage.tsx"
import LikeDislike from "../components/LikeDislike.tsx"
import {observer} from "mobx-react-lite"

const MyAccount = observer(() => {

    const {user} = useStore()
    const {internal} = useParams()
    const {profile, isLoading, isError} = useProfile(user.current ? user.current.login : null)

    return (<>
            {isLoading && <CircularProgress/>}
            {isError && <Box sx={{textAlign: "center"}}>ERROR</Box>}
            <Typography variant={"h5"}>My Favorites</Typography>
            <Grid container>
                {user.likes.map(item => {
                    return (<Grid item xs={6} sm={4} md={3} lg={2} key={item}>
                        <Stack direction={"row"} alignItems={"center"}>
                            <ALink component={Link} color={"primary"}
                                   to={"/user/" + item}>{item}</ALink>
                            <LikeDislike list={user.likes} name={item} like={user.like} dislike={user.dislike}/>
                        </Stack>
                    </Grid>)
                })}
            </Grid>
            <Typography variant={"h5"} sx={{mt:5}}>My Profile</Typography>
            {profile && !internal && <ProfileViewContent profile={profile}/>}
            {profile && internal && <InternalViewPage profile={profile} internal={internal}/>}
        </>
    )
})

export default MyAccount