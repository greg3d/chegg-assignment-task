import {observer} from "mobx-react-lite"
import {useStore} from "../stores/RootStore.ts"
import SearchPanel from "../components/SearchPanel.tsx"
import ObservedItemList from "../components/ObservedItemList.tsx"
import ProfileRecord from "../components/ProfileRecord.tsx"
import {useRef} from "react"
import {Box, Grid, Paper, Typography} from "@mui/material"
import SearchSorting from "../components/SearchSorting.tsx"
import Skeletons from "../components/Skeletons.tsx"
import {fetcher} from "../service/githubApi.ts"
import {useSearchInfinite} from "../hooks/useSearchInfinite.ts"

const SearchPage = observer(() => {

    const {search} = useStore()
    const loadMoreRef = useRef<HTMLDivElement>(null)

    const {isBusy, isEmpty, isError} = useSearchInfinite(fetcher, search, loadMoreRef)

    return (
        <Box>
            <Typography variant="h2" gutterBottom>
                Search Profiles
            </Typography>
            <Grid container gap={1}>
                <Grid item xs>
                    <SearchPanel
                        name={"search-profile"}
                        value={search.searchPrompt}
                        setter={search.setSearchPrompt}
                    />
                </Grid>
                <Grid item xs={"auto"}>
                    <SearchSorting store={search}/>
                </Grid>
            </Grid>

            {search.searchPrompt &&
                <Paper sx={{padding: 1, margin: "15px 0 25px"}}>
                    <Typography variant="body1">
                        Total found: {search.totalItems}
                    </Typography>
                </Paper>
            }

            <Grid container spacing={2}>
                {/*{search.items && search.items.length > 0 && search.items.map(item =>
                    <ProfileRecord item={item} key={"profile_" + item.id}/>)}

                {isBusy && <Skeletons count={search.perPage}/>}*/}

                <ObservedItemList
                    isLoading={isBusy}
                    isError={isError}
                    isEmpty={isEmpty}
                    items={search.items}
                    Component={ProfileRecord}
                    LoadingFallback={<Skeletons count={search.perPage}/>}
                />
            </Grid>

            <Box ref={loadMoreRef} sx={{height: "100px", width: "100%"}}></Box>
        </Box>
    )
})

export default SearchPage