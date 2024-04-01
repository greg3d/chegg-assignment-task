import axios, {AxiosError} from "axios"
import {store} from "../stores/RootStore.ts"
const API_BASE_URL = "https://api.github.com"

export const fetcherRaw = async (url: string) => {
    const response = await axios.get(url)
    return response.data
}

export const fetcher = async (url: string) => {
    const response = await axios.get(API_BASE_URL + url)
    return response.data
}

export const getProfileKey = (username: string) => {
    return `/users/${username}`
}

export const getUser = async (username: string) => {
    const data = await fetcher(getProfileKey(username))
    return data as IUser
}

export const getCurrentUser = async () => {
    const data = await fetcher(`/user`)
    return data as IUser
}

// interceptors

axios.interceptors.request.use((config) => {
    const {user} = store
    config.headers.setAccept("application/vnd.github+json")
    config.headers.set("X-GitHub-Api-Version", "2022-11-28")
    if (user.gitHubToken) {
        config.headers.setAuthorization("Bearer " + user.gitHubToken)
    }
    return config
}, (error) => {
    const {ui} = store
    ui.setError(error)
    return Promise.reject(error)
})

axios.interceptors.response.use((response) => {
    return response
}, (error: AxiosError) => {
    const {ui} = store
    ui.setError(error)
    return Promise.reject<AxiosError>(error)
})