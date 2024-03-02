//
import axios from "axios";

const API_TOKEN = "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";
const API_BASE_URL = 'https://api.github.com';

//https://api.github.com/search/users?q={query}&page=1&per_page=5

export const searchUsers = async (query: string, page: number, per_page: number) => {
    try {

        const response = await axios.get(`${API_BASE_URL}/search/users?q=${query}&page=${page}&per_page=${per_page}`, {
            headers: {
                Authorization: `Bearer ${API_TOKEN}`,
            }
        });
        const data = response.data as ISearchData;
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}