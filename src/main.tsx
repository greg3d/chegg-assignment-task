import ReactDOM from 'react-dom/client'
import './index.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Users from './components/Users.tsx';
import UserPage from "./components/UserPage.tsx";
import Home from "./components/Home.tsx";
import Root from "./components/Root.tsx";

const router = createBrowserRouter([
    {
        path: "*",
        Component: Root
    },
    {
        path: "/",
        Component: Home
    },
    {
        path: "/users",
        Component: Users
    },
    {
        path: "/users/:userId",
        Component: UserPage
    }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
    <RouterProvider router={router}/>
)
