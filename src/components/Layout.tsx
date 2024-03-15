import {observer} from "mobx-react-lite";
import {useStore} from "../stores/RootStore.ts";
import CustomLink from "./CustomLink.tsx";
import {Outlet} from "react-router-dom";
import {Box, Container, FormControlLabel, Modal, Switch, Typography} from "@mui/material";

const Layout = observer(() => {

    const {ui} = useStore();

    return (
        <Box>

            <Container>

                <FormControlLabel control={<Switch value={ui.theme === "dark"} name={"theme-switch"} onChange={ui.switchTheme} />} label="Label"/>
                <CustomLink to={"/"}>Home</CustomLink>
                <CustomLink to={"/search"}>Search</CustomLink>
                <CustomLink to={"/private"}>My GitHub</CustomLink>
                <CustomLink to={"/settings"}>Settings</CustomLink>

            </Container>

            <Container>
                <Outlet/>
            </Container>

            <Modal
                open={ui.showError}
                onClose={ui.ackError}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        {ui.error?.message}
                    </Typography>
                    <Typography id="modal-modal-description" sx={{mt: 2}}>
                        {ui.error?.response?.data?.message}
                    </Typography>
                </Box>
            </Modal>
        </Box>

        // <div className="row">
        //     <div className="col-4">
        //         <nav>
        //             <ul>
        //                 <li>
        //                     <Link to="/">Home</Link>
        //                 </li>
        //                 <li>
        //                     <Link to="/search">Search Profile</Link>
        //                 </li>
        //                 <li>
        //                     <Link to="/settings">Settings</Link>
        //                 </li>
        //             </ul>
        //         </nav>
        //     </div>
        //     <div className="col">
        //         <Outlet/>
        //     </div>
        // </div>

    );
});
export default Layout;