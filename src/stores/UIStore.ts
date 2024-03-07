import {makeAutoObservable, observable} from "mobx";
import {RootStore} from "./RootStore.ts";

class UIStore {
    readonly rootStore: RootStore

    resultsPerPage: number = 10;

    theme: string = "dark"

    windowDimensions = {
        width: window.innerWidth,
        height: window.innerHeight
    }

    constructor(rootStore: RootStore) {

        makeAutoObservable(this, {
            windowDimensions: observable.struct
        });
        window.onresize = () => {
            this.getWindowDimensions();
        }
        this.rootStore = rootStore;

    }

    getWindowDimensions() {
        this.windowDimensions = {
            width: window.innerWidth,
            height: window.innerHeight
        }
    }

    switchTheme = () => {
        if (this.theme === "dark") this.theme = "light"
        else this.theme = "dark";
    }
}

export default UIStore;