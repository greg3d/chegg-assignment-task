import {RootStore} from "./RootStore.ts"
import {makeAutoObservable, runInAction} from "mobx"

class UserStore implements IStore {
    readonly rootStore: RootStore

    current: IUser | null = null
    gitHubToken: string = ""

    constructor(rootStore: RootStore) {
        makeAutoObservable(this)
        this.rootStore = rootStore
    }

    setToken = (token: string) => {
        if (token !== "") {
            runInAction(() => {
                this.gitHubToken = token
                return true
            })
        }
        return false
    }

    setUser = (user: IUser) => {
        runInAction(() => this.current = user)
    }

    logout = () => {
        runInAction(() => {
            this.gitHubToken = ""
            this.current = null
        })
    }
}

export default UserStore