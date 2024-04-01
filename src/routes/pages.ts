import SearchPage from "../pages/SearchPage.tsx"
import SettingsPage from "../pages/SettingsPage.tsx"
import ProfileViewPage from "../pages/ProfileViewPage.tsx"
import {LoaderFunctionArgs, redirect, RouteObject} from "react-router-dom"
import {store} from "../stores/RootStore.ts"
import LoginPage from "../pages/LoginPage.tsx"
import MyAccount from "../pages/MyAccount.tsx"

export const pages = [
    {
        title: "Search Profiles",
        path: "/",
        Component: SearchPage,
        children: [{
            path: "user/:login",
            Component: ProfileViewPage,
            children: [
                {
                    path: ":internal",
                    Component: ProfileViewPage
                }
            ]
        }]
    },
    {
        title: "Settings",
        path: "settings",
        Component: SettingsPage
    },
    {
        title: "My Profile",
        path: "my-account",
        loader: profileLoader,
        Component: MyAccount,
        children: [
            {
                path: ":internal",
                Component: MyAccount
            }
        ]
    },

    {
        path: "login",
        Component: LoginPage
    }
]

function profileLoader({request}: LoaderFunctionArgs) {
    if (store.user.current === null) {
        const params = new URLSearchParams()
        params.set("from", new URL(request.url).pathname)
        return redirect("/login?" + params.toString())
    }
    return null
}

export const routes: RouteObject[] = pages.map((page) => {
    return {...page, id: page.title?.replace(" ", "")} as RouteObject
})

export const menu = pages.filter((item) => item.title).map((item) => ({
    title: item.title,
    path: item.path
} as { title: string, path: string }))