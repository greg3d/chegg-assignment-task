import {makeAutoObservable} from "mobx";
import {RootStore} from "./RootStore.ts";


class ProfilesStore {

    readonly rootStore: RootStore;

    searchPrompt: string = "";
    currentPage: number = 0;
    pagesCount: number = 0;

    constructor(rootStore: RootStore) {
        makeAutoObservable(this);
        this.rootStore = rootStore;
    }

    setSearchPrompt = (val: string) => {
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


}

export default ProfilesStore;