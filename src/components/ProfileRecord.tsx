import {Link} from "react-router-dom";

const ProfileRecord = ({item}: { item: GenericItem }) => {
    const profile = item as IUser;
    return (
        <div>
            <Link to={"/user/" + profile.login}> {profile.login}</Link>
        </div>
    );
};

export default ProfileRecord;