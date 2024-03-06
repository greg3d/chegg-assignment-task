import {observer} from "mobx-react-lite";
import {useStores} from "../stores/RootStore.ts";
import SearchPanel from "../components/SearchPanel.tsx";
import {useSearch} from "../hooks/useSearch.ts";
import ItemList from "../components/ItemList.tsx";
import ProfileRecord from "../components/ProfileRecord.tsx";
import {runInAction} from "mobx";


const SearchProfiles = observer(() => {
    const {profilesStore, uiStore} = useStores();

    const {profiles, isLoading, pages, count}
        = useSearch(profilesStore.searchPrompt, profilesStore.currentPage, uiStore.resultsPerPage)

    runInAction(()=>{
        profilesStore.pagesCount = pages;
    })

    return (
        <>
            <h1>Search Profiles</h1>
            <button onClick={()=>profilesStore.prevPage()}>prev page</button>
            <button onClick={()=>profilesStore.nextPage()}>next page</button>
            <div>{pages} | {count} | {profilesStore.currentPage} | {profilesStore.searchPrompt}</div>
            <SearchPanel className={"test"} name={"search-profile"} setter={profilesStore.setSearchPrompt}/>
            <ItemList isLoading={isLoading} items={profiles} Component={ProfileRecord}/>
        </>
    );
});

export default SearchProfiles;