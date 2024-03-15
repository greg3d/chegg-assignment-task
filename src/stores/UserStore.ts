import {RootStore} from "./RootStore.ts";
import {makeAutoObservable} from "mobx";

class UserStore implements IStore {
    readonly rootStore: RootStore

    current: IUser | null = null;
    gitHubToken: string = "";

    constructor(rootStore: RootStore) {
        makeAutoObservable(this);
        this.rootStore = rootStore;
    }

    setToken = (token: string) => {
        this.gitHubToken = token;
    }

    setUser(user: IUser) {
        this.current = user;
    }
}

export default UserStore;