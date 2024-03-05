import UIStore from "./UIStore.ts";
import ProfilesStore from "./ProfilesStore.ts";

export class RootStore {

    readonly uiStore;
    readonly profilesStore;

    constructor() {
        this.uiStore = new UIStore(this);
        this.profilesStore = new ProfilesStore(this);
    }
}
const store = new RootStore();
//const StoreContext = React.createContext(store);
export const useStores = () => store;