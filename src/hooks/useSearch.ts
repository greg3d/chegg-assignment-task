import useSWR, {Fetcher} from "swr"

export const useSearch = (
    params: Record<string, string> & Required<{ q: string }>,
    fetcher: Fetcher<ISearchData, string>,
    onSuccessCallback: (data: ISearchData) => void
) => {

    const {
        isLoading,
        isValidating,
        error,
        mutate
    } = useSWR(params.q ? "/search/users?" + new URLSearchParams(params) : null, fetcher, {
        onSuccess: (data) => onSuccessCallback(data),
        shouldRetryOnError: false
    })

    return {
        isLoading,
        isValidating,
        isError: error && !isLoading && !isValidating,
        mutate
    }
}