import {observer} from "mobx-react-lite";
import {useStore} from "../stores/RootStore.ts";
import {Outlet} from "react-router-dom";
import {
    Box,
    Container,
    CssBaseline
} from "@mui/material";
import HeaderResponsive from "./HeaderResponsive.tsx";
import {menu} from "../routes/pages.ts";
import MessageDialog from "./MessageDialog.tsx";

const Layout = observer(() => {

    const {ui} = useStore();

    return (
        <Box>
            <CssBaseline/>

            <HeaderResponsive items={menu}/>

            <Container maxWidth={"xl"}>
                <Outlet/>
            </Container>

            <MessageDialog
                onClose={ui.ackError}
                open={ui.showError}
                message={ui.error?.response?.data?.message}
                title={"Error!"}
            />
        </Box>
    );
});
export default Layout;