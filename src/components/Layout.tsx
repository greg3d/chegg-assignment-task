import {observer} from "mobx-react-lite";
import {Alert, Container, Nav, Navbar, Offcanvas} from "react-bootstrap";
import {useStores} from "../stores/RootStore.ts";
import Switch from "./Switch.tsx";
import Sandwich from "./Sandwich.tsx";
import CustomLink from "./CustomLink.tsx";
import {Outlet} from "react-router-dom";

const Layout = observer(() => {

    const {uiStore} = useStores();

    return (
        <div data-bs-theme={uiStore.theme}>
            <Navbar expand="sm" className="bg-body-tertiary">
                <Container>
                    <Navbar.Brand href="#home">
                        <Switch name={"theme-switch"} handler={uiStore.switchTheme}
                                value={uiStore.theme === "dark"}/>
                    </Navbar.Brand>
                    <Navbar.Toggle as={"button"} aria-controls={"basic-navbar-nav"}
                                   children={<Sandwich/>}/>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <CustomLink to={"/"}>Home</CustomLink>
                            <CustomLink to={"/search"}>Search</CustomLink>
                            <CustomLink to={"/private"}>My GitHub</CustomLink>
                            <CustomLink to={"/settings"}>Settings</CustomLink>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Container>
                <Outlet/>
            </Container>

            <Offcanvas show={uiStore.showError} onHide={uiStore.ackError} placement={"bottom"}
                       name={"errors"}>
                <Offcanvas.Body>
                    <Alert variant={"danger"} show={uiStore.showError}>
                        <Alert.Heading>
                            {uiStore.error?.message}
                        </Alert.Heading>
                        <p>
                            {uiStore.error?.response.data.message}
                        </p>
                    </Alert>
                </Offcanvas.Body>
            </Offcanvas>
        </div>

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