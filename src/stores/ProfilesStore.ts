import {makeAutoObservable, runInAction} from "mobx";
import {RootStore} from "./RootStore.ts";

class ProfilesStore implements ISearchStore {

    readonly rootStore: RootStore;

    searchPrompt: string = "";
    currentPage: number = 1;
    pagesCount: number = 1;
    totalCount: number = 0;
    profiles: IPartialUser[] = [];

    constructor(rootStore: RootStore) {
        makeAutoObservable(this);
        this.rootStore = rootStore;
    }

    get perPage() {
        return this.rootStore.uiStore.resultsPerPage;
    }

    setState = (pages: number, total: number, profiles?: IPartialUser[]) => {
        runInAction(()=>{
            this.pagesCount = pages;
            this.totalCount = total;
            if (profiles) {
                this.profiles = profiles
            }
        })
    }

    setSearchPrompt = (val: string) => {
        val = val.trim()
        if (val !== this.searchPrompt) {
            this.currentPage = 1;
            this.searchPrompt = val;
        }
    }

    nextPage = () => {
        if (this.currentPage < this.pagesCount)
            this.currentPage++;
    }

    prevPage = () => {
        if (this.currentPage > 1)
            this.currentPage--;
    }

    setPage = (index: number) => {
        if (index < this.totalCount && index > 0) {
            this.currentPage = index;
        }
    }
}

export default ProfilesStore;