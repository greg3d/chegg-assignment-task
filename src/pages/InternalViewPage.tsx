import {fetcherRaw} from "../service/githubApi.ts"
import useSWRInfinite from "swr/infinite"
import {Button, Grid, LinearProgress, Link as ALink, Stack} from "@mui/material"
import {Link} from "react-router-dom"
import LikeDislike from "../components/LikeDislike.tsx"
import {useStore} from "../stores/RootStore.ts"
import {observer} from "mobx-react-lite"

const InternalViewPage = observer(({profile, internal}: { profile: IUser, internal: string }) => {

    const {user} = useStore()

    type Data1 = IUser | IRepo
    let url = ""

    if (internal === "repos") {
        url = profile.repos_url
    }
    if (internal === "followers") {
        url = profile.followers_url
    }

    const def = "?per_page=24&page="
    const {
        data,
        isLoading,
        size,
        setSize
    } = useSWRInfinite<Data1[]>((index) => (url + def + (index + 1)), fetcherRaw)

    const items = (data && !isLoading) ? data.reduce((acc, val) => acc.concat(...val), []) : []
    return (
        <Grid container>
            {items.length > 0 &&
                items.map(item => {
                    if (internal === "repos") {
                        return (<Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
                            {(new Date(item.created_at)).toLocaleDateString()}
                            &nbsp;-&nbsp;<ALink href={item.html_url} target={"_blank"}>{item.name}</ALink>
                        </Grid>)
                    } else if (internal === "followers") {
                        return (<Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
                            <Stack direction={"row"} alignItems={"center"}>
                                <ALink component={Link} color={"primary"}
                                       to={"/user/" + item.login}>{item.login as string}</ALink>
                                <LikeDislike list={user.likes} name={item.login as string} like={user.like}
                                             dislike={user.dislike}/>
                            </Stack>
                        </Grid>)
                    } else {
                        return null
                    }
                })
            }
            {isLoading && <LinearProgress/>}
            {!isLoading &&
                <Button variant={"outlined"} sx={{mt: 2}} onClick={() => setSize(size + 1)}>load more</Button>}

        </Grid>
    )
})

export default InternalViewPage