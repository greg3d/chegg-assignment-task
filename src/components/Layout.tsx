import {observer} from "mobx-react-lite"
import {store, useStore} from "../stores/RootStore.ts"
import {Outlet} from "react-router-dom"
import {Box, Container, CssBaseline, ThemeProvider} from "@mui/material"
import HeaderResponsive from "./HeaderResponsive.tsx"
import {menu} from "../routes/pages.ts"
import MessageDialog from "./MessageDialog.tsx"
import {darkTheme, lightTheme} from "../helpers/themes.ts"

const Layout = observer(() => {

    const {ui} = useStore()

    return (
        <ThemeProvider theme={store.ui.getSetting("theme") === "light" ? lightTheme : darkTheme}>
            <CssBaseline/>
            <Box>
                <HeaderResponsive items={menu}/>

                <Container maxWidth={"xl"}>
                    <Outlet/>
                </Container>

                <MessageDialog
                    onClose={ui.ackError}
                    open={ui.showError}
                    message={ui.error?.response?.data.message}
                    title={"Error!"}
                />
            </Box>
        </ThemeProvider>
    )
})
export default Layout