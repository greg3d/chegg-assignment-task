import {Link} from "react-router-dom";
import styled from '@emotion/styled'
import {observer} from "mobx-react-lite";
import {Avatar, Box, Grid, Typography} from "@mui/material";

const RecordContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`

const ProfileRecord = observer(({item}: { item: GenericItem }) => {
    const profile = item as IUserPreview;
    return (
        <Grid item xs={12} sm={6} md={4} lg={4} xl={3}>
            <RecordContainer>
                <Avatar
                    variant={"circular"}
                    src={profile.avatar_url}
                    alt={profile.login}
                    sx={{
                        height: { lg: "80px", xs: "100px" },
                        width: { lg: "80px", xs: "100px" },

                    }}
                />
                <Box sx={{flexGrow: 1, ml: 2 }}>
                    <Typography variant={"h5"}>{profile.login}</Typography>
                    <Link to={"/user/" + profile.login}> {profile.login}</Link>
                </Box>
            </RecordContainer>
        </Grid>

    );
});

export default ProfileRecord;