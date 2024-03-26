import axios, {AxiosError} from "axios";
import {store} from "../stores/RootStore.ts";

// const API_TOKEN = "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";
const API_BASE_URL = 'https://api.github.com';

export const fetcher = async (url: string) => {
    const response = await axios.get(API_BASE_URL + url);
    return response.data;
}

export const getProfileKey = (username: string) => {
    return `${API_BASE_URL}/users/${username}`;
}

export const getUser = async (username: string) => {
    const data = await fetcher(getProfileKey(username));
    return data as IUser;
}

export const getCurrentUser = async ()=>{
    const data = await fetcher(`/user`)
    return data as IUser;
}

// interceptors

axios.interceptors.request.use((config) => {
    const {user} = store;
    if (user.gitHubToken) {
        config.headers.setAuthorization("Bearer " + user.gitHubToken)
    }
    return config;
}, (error) => {
    const {ui} = store;
    ui.setError(error);
    return Promise.reject(error);
})

axios.interceptors.response.use((response) => {
    return response;
}, (error: AxiosError) => {
    const {ui} = store;
    ui.setError(error);
    return Promise.reject<AxiosError>(error)
});