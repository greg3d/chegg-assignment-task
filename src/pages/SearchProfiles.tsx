import {observer} from "mobx-react-lite";
import {useStores} from "../stores/RootStore.ts";
import {Link} from "react-router-dom";
import SearchPanel from "../components/SearchPanel.tsx";

const SearchProfiles = observer(() => {
    const {profilesStore} = useStores();

    return (
        <>
            <h1>Search Profiles</h1>
            <SearchPanel name={} buttonDisabled={} handler={}/>
            {profilesStore.profiles.length != 0 &&
                profilesStore.profiles.map(profile =>
                    <div key={profile.id!}><Link to={`${profile.login}`}>{profile.login}</Link></div>
                )}
        </>
    );
});

export default SearchProfiles;