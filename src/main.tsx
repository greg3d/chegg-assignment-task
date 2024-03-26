import ReactDOM from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Layout from "./components/Layout.tsx";

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './scss/styles.scss';

import {routes} from "./routes/pages.ts";
import NotFound from "./pages/NotFound.tsx";

const router = createBrowserRouter([
    {
        id: "root",
        path: "/",
        element: <Layout/>,
        children: routes
    },
    {path: "*", element: <NotFound/>}
])

ReactDOM.createRoot(document.getElementById('root')!).render(
    <RouterProvider router={router}/>
)
