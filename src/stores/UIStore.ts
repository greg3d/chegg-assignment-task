import {makeAutoObservable, runInAction} from "mobx"
import {RootStore} from "./RootStore.ts"
import {AxiosError} from "axios"

class UIStore implements IStore {
    readonly rootStore: RootStore

    error: AxiosError | undefined
    showError: boolean = false

    settings: Map<string, ISetting>

    constructor(rootStore: RootStore) {
        makeAutoObservable(this)
        this.rootStore = rootStore
        this.settings = new Map<string, ISetting>()
        this.settings.set("resultsPerPage", 24)
        this.settings.set("searchPromptDebounce", 300)
        this.settings.set("searchFetchDebounce", 1100)
        this.settings.set("theme", "light")
    }

    setError = (error: AxiosError) => {
        this.error = error
        this.showError = true
    }

    ackError = () => {
        this.showError = false
    }

    getSetting = (key: string, safeDefaultValue?: ISetting) => {
        if (safeDefaultValue) {
            return this.settings.get(key) ?? safeDefaultValue
        } else {
            return this.settings.get(key)
        }
    }

    updateSetting = (key: string, value: ISetting) => {
        runInAction(() => {
            this.settings.set(key, value)
        })
    }

    toggleTheme = () => {
        runInAction(() => {
            this.settings.set("theme", this.settings.get("theme") === "light" ? "dark" : "light")
        })
    }
}

export default UIStore