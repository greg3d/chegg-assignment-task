import {makeAutoObservable, runInAction} from "mobx";
import {RootStore} from "./RootStore.ts";

class Sort {
    name: string
    label: string

    constructor(name: string, label: string) {
        this.name = name;
        this.label = label;
    }
}

class Sorts {

    list: Record<string, Sort> = {default: new Sort("", "Best match")}

    add(name: string, label: string) {
        if (name !== "default" && name !== "") {
            const sort = new Sort(name, label);
            this.list[sort.name] = sort;
        }
        return this;
    }

    get default() {
        return this.list.default.name;
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
    private readonly sorts: Sorts;
    sortBy: string;
    sortDir: "asc" | "desc" = "desc";

    constructor(rootStore: RootStore) {
        this.sorts = new Sorts();
        this.sorts
            .add("followers", "By Followers")
            .add("repositories", "By Repositories")
            .add("joined", "By Joined Time")

        this.sortBy = this.sorts.default;

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

    getSortList() {
        return Object.keys(this.sorts.list).map(key => {
            return {
                label: this.sorts.list[key].label,
                value: this.sorts.list[key].name
            }
        })
    }

    setStateInfinite = (data: ISearchData[]) => {
        runInAction(() => {
            this.setTotalItems(data[0].total_count);
            this.items = data ? data.reduce((acc: IUserPreview[], val: ISearchData) => acc.concat(...val.items), []) : [];
        })
    }

    setSortBy(val: string) {
        runInAction(() => {
            this.sortBy = val;
        })
    }

    setSortDir(val: string) {
        if (val === ("desc" || "asc")) {
            runInAction(() => {
                this.sortDir = val;
            })
        }
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

        return this.currentPage;
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