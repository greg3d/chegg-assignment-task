import {observer} from "mobx-react-lite";
import {useCallback, useRef, useState} from "react";
import {
    FormControl,
    FormControlLabel,
    FormLabel,
    Popover, Radio,
    RadioGroup,
    ToggleButton
} from "@mui/material";
import {FilterAltRounded} from "@mui/icons-material";
import SearchStore from "../stores/SearchStore.ts";

const SearchSorting = observer(({store}:{store:SearchStore}) => {

    const [popOverOpened, setOpened] = useState(false);
    const anchor = useRef<HTMLButtonElement>(null);

    const handleClick = useCallback(() => {
        setOpened(true);
    }, []);

    const handleClose = useCallback(() => {
        setOpened(false);
    }, []);

    return <>
        <ToggleButton
            id={"sorting-button"}
            aria-describedby={"search-filters"}
            size={"large"}
            value={popOverOpened}
            onClick={handleClick}
            ref={anchor}
        >
            <FilterAltRounded/>
        </ToggleButton>

        <Popover
            id={"search-filters"}
            open={popOverOpened}
            onClose={handleClose}
            anchorEl={anchor.current}
            anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
            }}
        >
            <FormControl sx={{p: 2}}>
                <FormLabel id="demo-radio-buttons-group-label">Sort By</FormLabel>
                <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue={""}
                    name="radio-buttons-group"
                    value={store.sortBy}
                    onChange={(e) => store.setSortBy(e.target.value)}
                >
                    {store.getSortList().map((item) => {
                        return <FormControlLabel
                            key={item.label}
                            value={item.value}
                            control={<Radio/>}
                            label={item.label}/>
                    })}
                </RadioGroup>

                <FormLabel id="radio-buttons-group-label2">Sort Dir</FormLabel>
                <RadioGroup
                    aria-labelledby="radio-buttons-group-label2"
                    defaultValue={"desc"}
                    name="radio-buttons-group2"
                    value={store.sortDir}
                    onChange={(e) => store.setSortDir(e.target.value)}
                >
                    <FormControlLabel
                        value={"desc"}
                        control={<Radio/>}
                        label={"Descending"}
                    />

                    <FormControlLabel
                        value={"asc"}
                        control={<Radio/>}
                        label={"Ascending"}
                    />

                </RadioGroup>
            </FormControl>
        </Popover>
    </>;
});

export default SearchSorting;