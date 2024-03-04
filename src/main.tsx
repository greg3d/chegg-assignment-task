import ReactDOM from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import ProfileModalView from "./components/ProfileModalView.tsx";
import "./scss/styles.scss";
import Home from "./components/Home.tsx";
import Layout from "./components/Layout.tsx";
import SearchProfiles from "./components/SearchProfiles.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout/>,
        children: [
            {
                path: "/",
                element: <Home/>
            },
            {
                path: "search",
                element: <SearchProfiles/>,
                children: [
                    {
                        path: "user/:id",
                        Component: ProfileModalView,
                        loader: ()=>{return {login: "Greg22"}},
                    }
                ]
            }
        ]
    },
    {path: "*", element: <Home/>}
])

ReactDOM.createRoot(document.getElementById('root')!).render(
    <RouterProvider router={router}/>
)
