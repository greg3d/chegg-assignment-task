import {observer} from "mobx-react-lite";
import {Link, Outlet} from "react-router-dom";

const Layout = observer(() => {

    return (
        <div className={"container-fluid"}>
            <div className="row">
                <div className="col-4">
                    <nav>
                        <ul>
                            <li>
                                <Link to="/">Home</Link>
                            </li>
                            <li>
                                <Link to="/profiles">Search Profile</Link>
                            </li>
                        </ul>
                    </nav>
                </div>
                <div className="col">
                    <Outlet/>
                </div>
            </div>
        </div>
    );
});
export default Layout;