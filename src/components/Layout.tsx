import {observer} from "mobx-react-lite";
import {Navbar, Container, Nav, NavDropdown} from "react-bootstrap";
import {useStores} from "../stores/RootStore.ts";
import Switch from "./Switch.tsx";
import Sandwich from "./Sandwich.tsx";
import CustomLink from "./CustomLink.tsx";
import {Link, Outlet} from "react-router-dom";

const Layout = observer(() => {

    const {uiStore} = useStores();

    return (
        <div className={"app-provider"} data-bs-theme={uiStore.theme}>
            <Navbar expand="sm" className="bg-body-tertiary">
                <Container>
                    <Navbar.Brand href="#home">
                        <Switch name={"theme-switch"} handler={uiStore.switchTheme} value={uiStore.theme === "dark"}/>
                    </Navbar.Brand>
                    <Navbar.Toggle as={"button"} aria-controls={"basic-navbar-nav"} children={<Sandwich/>}/>
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