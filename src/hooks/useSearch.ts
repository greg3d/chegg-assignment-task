import useSWR, {Fetcher} from "swr";
import {getProfileSearchKey} from "../service/githubApi.ts";

interface useSearchType {
    profiles: IPartialUser[] | []
    isLoading: boolean
    isValidating: boolean
    isError: any
}

export const useSearch = (store: ISearchStore, fetcher: Fetcher<ISearchData, string>) => {

    const {searchPrompt: query, currentPage: page, perPage} = store;

    const {
        data,
        error,
        isLoading,
        isValidating
    } = useSWR(query !== "" ? getProfileSearchKey(query, page, perPage) : null, fetcher)

    let items: IPartialUser[] = [];

    if (data) {
        const searchData = data as ISearchData;
        store.setState(Math.ceil(searchData.total_count / perPage), searchData.total_count)
        items = searchData.items;
    }

    return {
        profiles: items,
        isValidating,
        isLoading,
        isError: error
    } as useSearchType
}