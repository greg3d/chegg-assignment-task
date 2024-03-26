import React, {useCallback, useEffect, useRef} from "react";
import {AxiosError} from "axios";
import {Fetcher} from "swr";
import SearchStore from "../stores/SearchStore.ts";
import useSWRInfinite, {SWRInfiniteKeyLoader} from "swr/infinite";

export const useSearchInfinite = (
    fetcher: Fetcher<ISearchData, string>,
    search: SearchStore,
    loadMoreRef: React.RefObject<HTMLDivElement>,
) => {

    const counter = useRef<number>(0);
    const getKey = useCallback<SWRInfiniteKeyLoader>((index: number, prevData: ISearchData) => {

        if (prevData && !prevData.items.length) return null;
        // do not fetch if searchPrompt is empty
        if (!search.searchPrompt || search.searchPrompt === "") return null;

        let searchParams: Record<string, string> & { q: string } = {
            q: search.searchPrompt,
            per_page: search.perPage.toString(),
            page: (index + 1).toString()
        }

        if (search.sortBy !== "") {
            searchParams = {...searchParams, sort: search.sortBy, order: search.sortDir}
        }

        return `/search/users?` + new URLSearchParams(searchParams);

    }, [search.perPage, search.searchPrompt, search.sortBy, search.sortDir])

    const {
        data,
        isLoading,
        isValidating,
        error,
        setSize,
    } = useSWRInfinite<ISearchData, AxiosError>(getKey, fetcher, {
        shouldRetryOnError: false,
        onSuccess: (data1:ISearchData[]) => {
            search.setStateInfinite(data1)
        }
    });

    const isBusy = isLoading || isValidating;
    const isError: boolean = error !== undefined

    const isEmpty = data?.[0]?.items.length === 0;
    const isEnd = data && data[data.length - 1].items.length < search.perPage;

    const handleIntersection = useCallback<IntersectionObserverCallback>((entries) => {
        const target = entries[0];
        if (target.isIntersecting
            && search.searchPrompt !== ""
            && !isEnd
            && !isBusy
            && !isError
            && !isEmpty
        ) {
            setSize(size => size + 1);
        }
    }, [isBusy, isEmpty, isEnd, isError, search.searchPrompt, setSize])

    useEffect(() => {
        const observer = new IntersectionObserver(handleIntersection);
        counter.current = setTimeout(() => {
            if (loadMoreRef.current) observer.observe(loadMoreRef.current);
        }, 1000)
        return () => {
            clearTimeout(counter.current);
            observer.disconnect();
        };
    }, [handleIntersection, loadMoreRef])

    return {
        isBusy,
        isEnd,
        isError,
        isEmpty
    }
    
}