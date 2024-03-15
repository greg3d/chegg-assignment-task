import useSWR, {Fetcher} from "swr";

interface useSearchType {
    data: ISearchData
    isLoading: boolean
    isValidating: boolean
    isError: boolean,
}

export const useSearch = (
    params: Record<string, string> & Required<{ q: string }>,
    fetcher: Fetcher<ISearchData, string>,
    onSuccessCallback: (data: ISearchData) => void
) => {

    const {
        data,
        isLoading,
        isValidating,
        error,
        mutate
    } = useSWR(params.q ? '/search/users?' + new URLSearchParams(params) : null, fetcher, {
        onSuccess: (data) => onSuccessCallback(data),
        shouldRetryOnError: false
    })

    return {
        data,
        isLoading,
        isValidating,
        isError: error && !isLoading && !isValidating,
        mutate
    } as useSearchType
}