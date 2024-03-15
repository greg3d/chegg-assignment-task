import {makeAutoObservable, runInAction} from "mobx";
import {RootStore} from "./RootStore.ts";

class Sort {
    name: string
    value: string
    label: string

    constructor(name: string, val: string, label: string) {
        this.name = name;
        this.value = val;
        this.label = label;
    }

}

class Sorts {

    list: Record<string, Sort> = {basic: new Sort("default", "", "Best match")}

    add(sort: Sort) {
        if (sort.name !== "default" && sort.name !== "basic") {
            this.list[sort.name] = sort;
        }
        return this;
    }

    get default() {
        return this.list.basic;
    }

    constructor() {
        this.add.bind(this);
    }

}

class SearchStore implements ISearchStore<IUserPreview> {

    readonly rootStore: RootStore;

    searchPrompt: string = "";
    currentPage: number = 1;
    totalPages: number = 0;
    totalItems: number = 0;
    items: IUserPreview[] = [];

    // sorting
    sortBy: Sorts;
    sortDir: "asc" | "desc" = "desc"

    constructor(rootStore: RootStore) {
        this.sortBy = new Sorts();
        this.sortBy
            .add(new Sort("followers", "", "By Followers"))
            .add(new Sort("repositories", "", "By Repositories"))
        this.rootStore = rootStore;
        makeAutoObservable(this, {}, {
            autoBind: true
        });
    }

    get perPage() {
        return this.rootStore.ui.resultsPerPage;
    }

    get isEnd() {
        if (this.totalItems > 0)
            return this.totalItems === this.items.length;
        return false;
    }

    setState(result: ISearchData) {
        runInAction(() => {
            if (result && result.items && result.items.length > 0) {
                if (result.total_count !== this.totalItems) this.setTotalItems(result.total_count);
                console.log("Pushing Items")
                this.items.push(...result.items);
            }
            console.log("FinishJob")
        })
    }

    setTotalItems(val: number) {
        this.totalItems = val;
        this.totalPages = Math.ceil(val / this.perPage);
    }

    setSearchPrompt(val: string) {
        val = val.trim()
        if (val !== this.searchPrompt) {
            runInAction(() => {
                this.items = []
                this.currentPage = 1;
                this.totalPages = 1;
                this.totalItems = 0;
                this.searchPrompt = val;
            })
        }
    }

    // paginator methods
    nextPage() {
        if (this.currentPage < this.totalPages)
        this.currentPage++;
    }

    prevPage() {
        if (this.currentPage > 1)
            this.currentPage--;
    }

    setPage(index: number) {
        if (index < this.totalItems && index > 0) {
            this.currentPage = index;
        }
    }
}

export default SearchStore;