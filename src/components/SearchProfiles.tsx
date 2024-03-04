import {observer} from "mobx-react-lite";
import {useStores} from "../stores/RootStore.ts";
import {Link, Outlet} from "react-router-dom";

const SearchProfiles = () => {
    const {profilesStore} = useStores();
    return (
        <div>
            <h1>Search Profiles</h1>
            {profilesStore.currentPage}
            {profilesStore.profiles.length != 0 && profilesStore.profiles.map(profile => <div>{profile.login}</div>)}
            <Link to={"user/33"} >dsf</Link>
            <Outlet />
        </div>
    );
};

export default observer(SearchProfiles);