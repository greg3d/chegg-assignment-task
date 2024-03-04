import {observer} from "mobx-react-lite";
import profilesStore from "../stores/ProfilesStore.ts";
import {useStores} from "../stores/RootStore.ts";

const SearchProfiles = () => {
    const {profilesStore} = useStores();
    return (
        <div>
            <h1>Search Profiles</h1>
            {profilesStore.currentPage}
            {profilesStore.users}
        </div>
    );
};

export default observer(SearchProfiles);