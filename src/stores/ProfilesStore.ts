import {makeAutoObservable, runInAction} from "mobx";
import {RootStore} from "./RootStore.ts";

class ProfilesStore implements ISearchStore<IPartialUser> {

    readonly rootStore: RootStore;

    searchPrompt: string = "";
    currentPage: number = 1;
    pagesCount: number = 1;
    totalCount: number = 0;
    prevPageData: IPartialUser[] = [];

    constructor(rootStore: RootStore) {
        makeAutoObservable(this);
        this.rootStore = rootStore;
    }

    get perPage() {
        return this.rootStore.uiStore.resultsPerPage;
    }

    setState = (pages: number, total: number, prevPageData?: IPartialUser[]) => {
        runInAction(() => {
            this.pagesCount = pages;
            this.totalCount = total;
            if (prevPageData) {
                this.prevPageData = prevPageData;
            }
        })
    }

    setSearchPrompt = (val: string) => {
        val = val.trim()
        if (val !== this.searchPrompt) {
            this.prevPageData = []
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