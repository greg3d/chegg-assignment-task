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
export const rootStore = new RootStore();
export const useStores = () => rootStore;