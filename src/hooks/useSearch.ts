import useSWR from "swr";
import {searchUsers} from "../service/githubApi.ts";

interface useSearchType {
    profiles: IPartialUser[] | []
    count: number
    pages: number
    isLoading: boolean
    isError: any
}

function sanitize(val: string) {
    return val.trim()
}

export const useSearch = (query: string, page: number, per_page: number) => {

    query = sanitize(query)
    const {data, error, isLoading} = useSWR(query !== "" ? [query, page, per_page] : null, searchUsers)

    if (data) {
        const searchData = data as ISearchData;
        return {
            profiles: searchData?.items,
            count: searchData?.total_count,
            pages: Math.ceil(searchData.total_count / 10),
            isLoading,
            isError: error
        } as useSearchType
    }

    return {
        profiles: [],
        count: 0,
        pages: 1,
        isLoading,
        isError: error
    } as useSearchType
}