import {observer} from "mobx-react-lite";
import {useStore} from "../stores/RootStore.ts";
import SearchPanel from "../components/SearchPanel.tsx";
import ObservedItemList from "../components/ObservedItemList.tsx";
import ProfileRecord from "../components/ProfileRecord.tsx";
import {fetcher} from "../service/githubApi.ts";
import {useSearch} from "../hooks/useSearch.ts";
import {useCallback, useEffect, useRef} from "react";
import {
    Box,
    Grid,
    LinearProgress,
    Paper,
    ToggleButton,
    Typography
} from "@mui/material";
import {FilterAltRounded} from "@mui/icons-material";

const SearchProfiles = observer(() => {

    const {search} = useStore();

    const cnt = useRef(0)

    const {data, isValidating, isError} = useSearch({
        q: search.searchPrompt,
        per_page: search.perPage.toString(),
        page: search.currentPage.toString(),
    }, fetcher, search.setState)

    const loadMoreRef = useRef<HTMLDivElement>(null);

    const handleIntersection = useCallback<IntersectionObserverCallback>((entries) => {
        const target = entries[0];
        if (target.isIntersecting && !isValidating && !search.isEnd && search.searchPrompt) {
            console.log("Next page")
            search.nextPage()
        }
    }, [isValidating, search]);

    useEffect(() => {
        const observer = new IntersectionObserver(handleIntersection);
        if (loadMoreRef.current) observer.observe(loadMoreRef.current);
        return () => observer.disconnect();
    }, [handleIntersection])


    useEffect(() => {
        console.log("rerendered: ", data, isError, isValidating, search);
    })

    cnt.current++;
    return (

        <Box>
            <Typography variant="h3" gutterBottom>
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
                    <ToggleButton size={"large"} value={true}>
                        <FilterAltRounded/>
                    </ToggleButton>
                </Grid>
            </Grid>


            <Paper sx={{padding: 1, margin: "15px 0"}}>{search.totalItems}</Paper>

            <ObservedItemList
                isLoading={isValidating}
                isError={isError}
                items={search.items}
                Component={ProfileRecord}
                LoadingFallback={<LinearProgress/>}
                NotFoundFallback={<Box>NOTHING FOUND...</Box>}
            />

            <div ref={loadMoreRef}></div>
        </Box>
    );
});

export default SearchProfiles;