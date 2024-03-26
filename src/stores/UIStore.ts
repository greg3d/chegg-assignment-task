import {makeAutoObservable} from "mobx";
import {RootStore} from "./RootStore.ts";
import {AxiosError} from "axios";

class UIStore implements IStore {
    readonly rootStore: RootStore

    resultsPerPage: number = 12;
    error: AxiosError | undefined;
    showError: boolean = false;
    theme: string = "light"

    constructor(rootStore: RootStore) {
        makeAutoObservable(this);
        this.rootStore = rootStore;
    }

    setError = (error: AxiosError) => {
        this.error = error;
        this.showError = true;
    }

    ackError = ()=>{
        this.showError = false;
    }

    switchTheme = () => {
        if (this.theme === "dark") this.theme = "light"
        else this.theme = "dark";
    }
}

export default UIStore;