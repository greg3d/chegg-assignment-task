import useSWR from "swr"
import {getCurrentUser} from "../service/githubApi.ts"

import {store} from "../stores/RootStore.ts"

export default function useUser() {
    const {data, mutate, error} = useSWR("api_user_load", getCurrentUser, {
        shouldRetryOnError: false,
        onSuccess: data => store.user.setUser(data)
    })

    const loading = !data && !error

    return {
        loading,
        mutate,
        error
    }

}