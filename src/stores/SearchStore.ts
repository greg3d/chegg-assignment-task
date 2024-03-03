import {makeAutoObservable} from "mobx";
import {RootStore} from "./RootStore.ts";

class SearchStore {

    private rootStore: RootStore;

    searchPrompt: string = "";
    currentPage: number = 0;
    pagesCount: number = 0;
    users: IUser[] = [];

    constructor(rootStore: RootStore) {
        makeAutoObservable(this);
        this.rootStore = rootStore;
    }

    addPage() {
        this.currentPage++;
    }

}

export default SearchStore;