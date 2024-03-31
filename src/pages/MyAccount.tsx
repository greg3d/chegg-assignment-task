import {useStore} from "../stores/RootStore.ts"
import useUser from "../hooks/useUser.ts"
import {CircularProgress} from "@mui/material"

const MyAccount = () => {

    const {user} = useStore()
    const {loading} = useUser()
    if (loading) return <CircularProgress/>

    return (
        <div>
            {user.current?.avatar_url}
        </div>
    )
}

export default MyAccount