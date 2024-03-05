import ReactDOM from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import "./scss/styles.scss";
import Home from "./pages/Home.tsx";
import Layout from "./components/Layout.tsx";
import SearchProfiles from "./pages/SearchProfiles.tsx";
import Settings from "./pages/Settings.tsx";
import ProfileView from "./pages/ProfileView.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout/>,
        children: [
            {
                path: "/",
                index: true,
                Component: Home
            },
            {
                path: "search",
                Component: SearchProfiles,
            },
            {
                path: "settings",
                Component: Settings
            },
            {
                path: "user/:login",
                Component: ProfileView
            }
        ]
    },
    {path: "*", element: <Home/>}
])

ReactDOM.createRoot(document.getElementById('root')!).render(
    <RouterProvider router={router} />
)
