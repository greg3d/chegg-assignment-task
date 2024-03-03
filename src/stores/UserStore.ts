import {makeAutoObservable} from "mobx";

class UserStore {

    value: IUser | undefined;
    logged: boolean = false;

    constructor(user: IUser) {
        makeAutoObservable(this);
        this.value = user;
    }

    logout() {
        this.value = undefined;
        this.logged = false;
    }
}

export default UserStore;