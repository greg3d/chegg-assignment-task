import {observer} from "mobx-react-lite";
import {useStores} from "../stores/RootStore.ts";
import SearchPanel from "../components/SearchPanel.tsx";
import {useSearch} from "../hooks/useSearch.ts";
import ItemList from "../components/ItemList.tsx";
import ProfileRecord from "../components/ProfileRecord.tsx";
import {fetcher} from "../service/githubApi.ts";

const SearchProfiles = observer(() => {
    const {profilesStore} = useStores();

    const {isLoading, isError} = useSearch(profilesStore, fetcher)

    return (
        <>
            <h1>Search Profiles</h1>
            <button onClick={() => profilesStore.prevPage()}>prev page</button>
            <button onClick={() => profilesStore.nextPage()}>next page</button>
            <SearchPanel name={"search-profile"} value={profilesStore.searchPrompt}
                         setter={profilesStore.setSearchPrompt}/>


            <ItemList isLoading={isLoading} isError={isError}
                      items={profilesStore.prevPageData}
                      Component={ProfileRecord}/>


        </>
    );
});

export default SearchProfiles;