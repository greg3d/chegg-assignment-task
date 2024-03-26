import UIStore from "./UIStore.ts";
import SearchStore from "./SearchStore.ts";
import {createContext, useContext} from "react";
import UserStore from "./UserStore.ts";

export class RootStore {

    readonly ui: UIStore;
    readonly search: SearchStore;
    readonly user: UserStore;

    constructor() {
        this.ui = new UIStore(this);
        this.search = new SearchStore(this);
        this.user = new UserStore(this);
    }
}
export const store = new RootStore();
const StoreContext = createContext(store);
export const useStore = () => {
    return useContext(StoreContext);
}