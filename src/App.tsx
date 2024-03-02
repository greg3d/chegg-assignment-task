import {useEffect, useState} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {searchUsers} from "./service/gitHubApiService.ts";

function App() {
    const [users, setUsers] = useState<ISearchData>()

    useEffect(() => {
        searchUsers("greg3d", 1, 5).then(data => {
            setUsers(data)
        })
    }, [])

    return (
        <>
            <div>{JSON.stringify(users)}</div>
        </>
    )
}

export default App
