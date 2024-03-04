import UIStore from "./UIStore.ts";
import ProfilesStore from "./ProfilesStore.ts";
import React from "react";

export class RootStore {

    readonly uiStore;
    readonly profilesStore;

    constructor() {
        this.uiStore = new UIStore(this);
        this.profilesStore = new ProfilesStore(this);
    }
}

const StoreContext = React.createContext(new RootStore());
export const useStores = () => React.useContext(StoreContext);