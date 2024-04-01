import {Avatar, Typography} from "@mui/material"
import GitHubIcon from "@mui/icons-material/GitHub"
import PeopleIcon from "@mui/icons-material/People"
import LocationOnIcon from "@mui/icons-material/LocationOn"
import ApartmentIcon from "@mui/icons-material/Apartment"
import EmailIcon from "@mui/icons-material/Email"
import LinkIcon from "@mui/icons-material/Link"
import {NumericParamWithIcon, StringParamWithIcon} from "./ParamComponents.tsx"

const ProfileHeader = ({profile}: { profile: IUser }) => {
    return (<>
        <Avatar
            src={profile.avatar_url}
            alt={profile.name}
            variant={"circular"}
            sx={{
                border: "1px solid #EEE",
                borderColor: "divider",
                boxShadow: "2px 2px 1px #00000055, 20px 20px 50px #00000025",
                margin: "auto",
                height: {lg: "auto", xs: "175px", sm: "200px"},
                width: {lg: "100%", xs: "175px", sm: "200px"},
                mb: 4
            }}
        >
        </Avatar>
        <Typography variant={"h4"}>
            {profile.name}
        </Typography>
        <Typography variant={"h5"} sx={{mb: 1}}>
            <StringParamWithIcon
                link={profile.html_url}
                icon={GitHubIcon}
                param={profile.login}
            />
        </Typography>
        <NumericParamWithIcon
            single={"follower"}
            plural={"followers"}
            icon={PeopleIcon}
            param={profile.followers}
        />
        <StringParamWithIcon
            link={false}
            icon={LocationOnIcon}
            param={profile.location}
        />
        <StringParamWithIcon
            link={false}
            icon={ApartmentIcon}
            param={profile.company}
        />
        <StringParamWithIcon
            link={"mailto:" + profile.email}
            icon={EmailIcon}
            param={profile.email}
        />
        <StringParamWithIcon
            link={profile.blog === "" ? null : profile.blog}
            icon={LinkIcon}
            param={profile.blog === "" ? null : profile.blog}
        />
    </>)
}

export default ProfileHeader