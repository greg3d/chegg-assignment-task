interface IStore {
    rootStore: object
}

interface ISearchStore<T> extends IStore {
    searchPrompt: string
    currentPage: number
    totalItems: number
    totalPages: number
    perPage: number
    sortBy: string
    sortDir: string
    items: T[]

    getSortList: () => { value: string, label: string }[]
    setSearchPrompt: (val: string) => void
    setSortDir: (val: string) => void
    setSortBy: (val: string) => void

    nextPage?: () => void
    prevPage?: () => void
    setPage?: (index: number) => void

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
    updated_at: string
    total_private_repos: number
    owned_private_repos: number
    disk_usage: number
    collaborators: number
}

type IUserPreview = Pick<IUser, "id" | "login" | "avatar_url" | "url" | "type" | "repos_url" | "html_url">

interface ISearchData {
    total_count: number
    incomplete_results: boolean
    items: IUserPreview[]
}

type GenericItem = ({ id: number } & { [key: string]: unknown })
type ISetting = number | string | boolean


interface IRepo extends Record<string, number | string | IUser | boolean | null | string> {
    id: number
    name: string
    full_name: string
    owner: IUser
    private: boolean
    html_url: string
    description: string | null
    created_at: string
    updated_at: string
}