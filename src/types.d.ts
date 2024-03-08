interface IStore {
    rootStore: object
}

interface ISearchStore extends IStore {
    searchPrompt: string
    currentPage: number
    totalCount: number
    pagesCount: number
    perPage: number
    nextPage: () => void
    prevPage: () => void
    setPage: (index: number) => void
    setSearchPrompt: (val: string) => void
    setState: (total: number, pages: number) => void

}

interface IUser {
    login: string
    id: number
    node_id: string
    avatar_url: string
    gravatar_id: string,
    url: string
    html_url: string
    followers_url: string
    following_url: string
    starred_url: string
    subscriptions_url: string
    organizations_url: string
    repos_url: string
    events_url: string
    received_events_url: string
    type: string
    site_admin: boolean
    score: number

    [key: string]: string | number
}

type IPartialUser = { id: number, login: string } & Partial<IUser>

interface ISearchData {
    total_count: number
    incomplete_results: boolean
    items: IPartialUser[] | []
}

type GenericItem = ({ id: number } & { [key: string]: any })