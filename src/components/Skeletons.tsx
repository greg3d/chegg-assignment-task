import {Box, Grid, LinearProgress, Skeleton} from "@mui/material";

const Skeletons = ({count}:{count:number}) => {

    return (
        <>
            <LinearProgress />
            {[...Array(count)].map((e, i) => (
                <Grid item xs={12} sm={6} md={4} lg={4} xl={3} key={i}>
                    <Box sx={{display: "flex", flexDirection: 'row'}}>
                        <Box>
                            <Skeleton variant="circular" width={100}
                                      height={100}/>
                        </Box>
                        <Box>
                            <Skeleton variant="rectangular" width={100}
                                      height={30}
                                      sx={{mb: 3}}/>
                            <Skeleton variant="rectangular" width={150}
                                      height={10}
                                      sx={{mb: 3}}/>
                            <Skeleton variant="rectangular" width={120}
                                      height={10}
                                      sx={{mb: 3}}/>
                        </Box>
                    </Box>
                </Grid>
            ))}
        </>
    );
};

export default Skeletons;