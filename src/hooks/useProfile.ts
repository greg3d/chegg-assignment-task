import useSWR from "swr"
import {getUser} from "../service/githubApi.ts"

export const useProfile = (name: string | null) => {
    const {data, error, isLoading} = useSWR(name, getUser)

    return {
        profile: data,
        isLoading,
        isError: error
    }
}