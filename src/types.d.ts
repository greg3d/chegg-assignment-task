interface IStore {
    rootStore: object
}

interface ISearchStore<T> extends IStore {
    searchPrompt: string
    currentPage: number
    totalItems: number
    totalPages: number
    perPage: number
    isEnd: boolean
    sortBy: string
    sortDir: string
    items: T[]

    getSortList: ()=>{value:string, label: string}[]

    nextPage: () => void
    prevPage: () => void
    setPage: (index: number) => void
    setSearchPrompt: (val: string) => void
    setSortDir: (val: string)=>void
    setSortBy: (val: string)=>void

}

interface IUser extends Record<string, string | number | boolean> {
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
    name: string,
    company: string | null
    blog: string
    location: string
    email: string | null
    bio: string
    twitter_username: string | null
    public_repos: number
    public_gists: number
    followers: number
    following: number
    created_at: string
}

type IUserPreview = Pick<IUser, 'id' | 'login' | 'avatar_url' | 'url' | 'type'>

interface ISearchData {
    total_count: number
    incomplete_results: boolean
    items: IUserPreview[]
}

type GenericItem = ({ id: number } & { [key: string]: any })
