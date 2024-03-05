import {useParams} from "react-router-dom";
import {useProfile} from "../hooks/useProfile.ts";
import LazyImage from "../components/LazyImage.tsx";
import useSWR from "swr";
import {fetch} from "../service/githubApi.ts";
import {observer} from "mobx-react-lite";

const ProfileView = observer(() => {

    const {login} = useParams();
    const {profile, isLoading, isError} = useProfile(login!);
    const {data: followers, isLoading: fLoading} = useSWR(() => profile ? profile.followers_url : null, fetch);

    if (isLoading) return <div>IS LOADING...</div>
    if (isError) return <div>IS ERROR</div>


    return (
        <div>
            <LazyImage src={profile!.avatar_url} fallback={"###"} alt={profile!.login}/>
            {followers?.length}<br/>
            {!fLoading ?
                followers && followers.map((follower: IUser) => <li>{follower.login}</li>)
                :
                "loading followers..."
            }
        </div>
    );
});

export default ProfileView;