import React, {useEffect, useRef, useState} from "react";

interface Props {
    name: string
    value: string
    setter: (val: string) => void
}

const SearchPanel = (props: Props) => {

    const [val, setVal] = useState("");
    const {name, setter, value} = props;

    useEffect(()=>{
        setVal(value)
    },[])
    const debounce = useRef(0);
    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setVal(e.target.value)
        clearTimeout(debounce.current);
        debounce.current = setTimeout(() => setter(e.target.value), 300);
    }
    return (
        <input type="search" value={val} name={name} onChange={changeHandler}/>
    );
};

export default SearchPanel;