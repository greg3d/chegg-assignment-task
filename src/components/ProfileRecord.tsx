import {Link} from "react-router-dom";
import styled from '@emotion/styled'
import {observer} from "mobx-react-lite";
import {Typography} from "@mui/material";

const RecordContainer = styled.div`
  height: 100px;
  width: 100%;
  border: 1px solid black
`

const ProfileRecord = observer(({item}: { item: GenericItem }) => {
    const profile = item as IUserPreview;
    return (
        <RecordContainer>
            <Typography variant={"h5"}>{profile.login}</Typography>
            <Link to={"/user/" + profile.login}> {profile.login}</Link>
        </RecordContainer>
    );
});

export default ProfileRecord;