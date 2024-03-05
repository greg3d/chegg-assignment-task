import {makeAutoObservable, runInAction} from "mobx";
import {RootStore} from "./RootStore.ts";
import {searchUsers} from "../service/githubApi.ts";
import useSWR from "swr";

class ProfilesStore {

    readonly rootStore: RootStore;

    searchPrompt: string = "";
    currentPage: number = 0;
    pagesCount: number = 0;

    profiles: Partial<IUser>[] = [];

    constructor(rootStore: RootStore) {
        makeAutoObservable(this);
        this.rootStore = rootStore;
    }

    countPages(numberOfResults: number, resultsOnPage: number) {
        this.pagesCount = Math.ceil(numberOfResults / resultsOnPage);
    }

    search = async (prompt: string) => {
        this.searchPrompt = prompt;
        this.currentPage = 1;
        this.pagesCount = 1;
        this.profiles = [];

        try {
            const res = await searchUsers(prompt, this.currentPage, this.rootStore.uiStore.resultsPerPage);
            runInAction(() => {
                if (res.total_count > 0) {
                    this.countPages(res.total_count, this.rootStore.uiStore.resultsPerPage);
                    this.profiles = res.items;
                }
            })
        } catch (e) {
            console.log("error")
        }
    }
}

export default ProfilesStore;