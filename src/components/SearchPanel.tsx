import React, {useEffect, useRef, useState} from "react"
import {IconButton, InputAdornment, TextField} from "@mui/material"
import SearchIcon from "@mui/icons-material/Search"

interface Props {
    name: string
    value: string
    setter: (val: string) => void
    debounce?: number
}

const SearchPanel = (props: Props) => {

    const [val, setVal] = useState("")
    const {name, setter, value} = props

    useEffect(() => {
        setVal(value)
    }, [value])
    const debounce = useRef(0)
    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setVal(e.target.value)
        clearTimeout(debounce.current)
        debounce.current = setTimeout(() => setter(e.target.value), props.debounce ? props.debounce : 500)
    }
    return (

        <TextField
            autoComplete={"off"}
            InputProps={{
                startAdornment: (
                    <InputAdornment position={"start"}>
                        <IconButton>
                            <SearchIcon/>
                        </IconButton>
                    </InputAdornment>
                )
            }}
            type={"search"}
            id={name}
            name={name}
            label="Search Github Profiles"
            value={val}
            onChange={changeHandler}
            fullWidth={true}
            variant={"outlined"}
            size={"medium"}
        />


    )
}

export default SearchPanel