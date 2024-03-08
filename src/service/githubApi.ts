import axios, {AxiosError} from "axios";
import {rootStore} from '../stores/RootStore.ts';
//const API_TOKEN = "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";
const API_BASE_URL = 'https://api.github.com';

export const fetcher = async (url: string) => {
    try {


        const response = await axios.get(url);
        return response.data;
    } catch (e) {
        rootStore.uiStore.setError(e as AxiosError);
    }
}

export const getProfileSearchKey = (query: string, page: number, per_page: number) => {
    return `${API_BASE_URL}/search/users?q=${query}&page=${page}&per_page=${per_page}`;
}

export const getProfileKey = (username: string) => {
    return `${API_BASE_URL}/users/${username}`;
}

export const getUser = async (username: string) => {
    const data = await fetcher(getProfileKey(username));
    return data as IUser;
}


// interceptor

axios.interceptors.response.use((response) => {
    return response;
}, (error: AxiosError) => {
    return Promise.reject<AxiosError>(error)
});