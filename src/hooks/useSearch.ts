import useSWR, {Fetcher} from "swr";
import {getProfileSearchKey} from "../service/githubApi.ts";

interface useSearchType {
    profiles: IPartialUser[] | []
    isLoading: boolean
    isValidating: boolean
    isError: any
}

export const useSearch = (store: ISearchStore<IPartialUser>, fetcher: Fetcher<ISearchData, string>) => {

    const {searchPrompt: query, currentPage: page, perPage} = store;

    const {
        data,
        isLoading,
        isValidating,
        error
    } = useSWR(getProfileSearchKey(query, page, perPage), fetcher)

    let items: IPartialUser[] = [];

    if (data) {
        items = data.items;
        store.setState(Math.ceil(data.total_count / perPage), data.total_count, data.items)
    }

    return {
        profiles: items,
        isLoading,
        isValidating,
        isError: error,
    } as useSearchType
}