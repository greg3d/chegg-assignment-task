import UIStore from "./UIStore.ts";
import SearchStore from "./SearchStore.ts";
import React from "react";

export class RootStore {

    readonly uiStore;
    readonly searchStore;

    constructor() {
        this.uiStore = new UIStore(this);
        this.searchStore = new SearchStore(this);
    }
}

const StoreContext = React.createContext(new RootStore());
export const useStores = () => React.useContext(StoreContext);