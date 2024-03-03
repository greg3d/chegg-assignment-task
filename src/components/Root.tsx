import {useEffect, useState} from 'react'
import {searchUsers} from "./../service/gitHubApiService.ts";

function Root() {
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

export default Root
