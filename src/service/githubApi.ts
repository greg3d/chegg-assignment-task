import axios from "axios";
//const API_TOKEN = "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";
const API_BASE_URL = 'https://api.github.com';

export const fetch = async (url: string) => {
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

export const fetch2 = async (url: string) => {
    try {
        await new Promise((r)=>setTimeout(r, 1500));
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

export const imageFetch = async (url: string) => {
    try {
        const response = await axios.get(url, {

        });
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

export const searchUsers = async ([query, page, per_page]:[query: string, page: number, per_page: number]) => {
    const url = `${API_BASE_URL}/search/users?q=${query}&page=${page}&per_page=${per_page}`;
    const data = await fetch(url);
    return data as ISearchData;
}

// export const searchUsers = async (query: string, page: number, per_page: number) => {
//     const url = `${API_BASE_URL}/search/users?q=${query}&page=${page}&per_page=${per_page}`;
//     const data = await fetch(url);
//     return data as ISearchData;
// }
export const getUser = async (username: string) => {
    const url = `${API_BASE_URL}/users/${username}`;
    const data = await fetch(url);
    return data as IUser;
}

axios.interceptors.response.use((response) => {
    return response;
}, (error) => {
    return Promise.reject(error.message);
});