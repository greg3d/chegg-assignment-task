import React, {useRef} from "react";

interface Props {
    className?: string
    name: string
    setter: (val: string) => void
}

const SearchPanel = (props: Props) => {

    const {name, setter, className} = props;

    const debounce = useRef(0);
    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        clearTimeout(debounce.current);
        debounce.current = setTimeout(() => setter(e.target.value), 300);
    }

    return (
        <input className={className} type="search" name={name} onChange={changeHandler}/>
    );
};

export default SearchPanel;