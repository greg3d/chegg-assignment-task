import useSWR from "swr";
import { searchUsers } from "../service/githubApi.ts";

export const useSearch = (query: string, page: number, per_page: number) => {
    const {data, error, isLoading} = useSWR([query, page, per_page], searchUsers)

    const searchData : ISearchData = data as ISearchData;

    return {
        profiles: searchData.items,
        count: searchData.total_count,

        isLoading,
        isError: error
    }
}