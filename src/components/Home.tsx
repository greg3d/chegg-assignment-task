import {useStores} from "../stores/RootStore.ts";
import {useObserver} from "mobx-react-lite";

const Home = () => {
    const {searchStore} = useStores();
    return useObserver(() => (
        <div>
            <h1>Home</h1>
            <p>{searchStore.currentPage}</p>
            <button onClick={() => searchStore.addPage()}>Click Me</button>
        </div>
    ));
};

export default Home;