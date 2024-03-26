import {Button, TextField} from "@mui/material";
import {useCallback, useState} from "react";
import {useStore} from "../stores/RootStore.ts";
import {useNavigate} from "react-router-dom";
import {getCurrentUser} from "../service/githubApi.ts";

const LoginPage = () => {

    const {user, ui} = useStore();
    const [token, setToken] = useState("");
    const nav = useNavigate();

    const handleClick = useCallback(() => {
        user.setToken(token);
        getCurrentUser().then(res => {
            user.setUser(res);
            if (res) nav('/my-account')
        }).catch(error => {
            user.setToken("");
            ui.setError(error)
        });
    }, [nav, token, ui, user])

    return (
        <div>
            AUTH
            <TextField id="user-token" label="GitHub Token" variant="outlined"
                       value={token} onChange={(e) => setToken(e.target.value)}
            />
            <Button onClick={handleClick}>
                Login
            </Button>
        </div>
    );
};

export default LoginPage;