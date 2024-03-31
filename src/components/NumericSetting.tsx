import {observer} from "mobx-react-lite";
import {Box, Slider, Stack, Typography} from "@mui/material";

interface Props {
    label: string
    units: string
    keyAndDefault: { key: string, defaultValue: ISetting }
    getValue: (key: string, defaultValue?: ISetting) => ISetting | undefined
    setValue: (key: string, value: ISetting) => void
    min: number
    max: number
    step: number
}

const NumericSetting = observer((
    {
        label, units, min, max, step,
        keyAndDefault: {key, defaultValue},
        getValue,
        setValue
    }: Props) => {

    const value = getValue(key, defaultValue)
    const mul = Math.floor(2 * ((max - min) / 10) / step)
    const marks = []
    for (let i = min; i <= max; i += step * mul) {
        marks.push({
            value: i,
            label: i.toString()
        })
    }

    return (<Box sx={{
        borderWidth: "1px", borderStyle: "solid", borderColor: "divider", borderRadius: 2,
        my: 3, pt: 2, pb: 4, px: 3
    }}>
        <Typography variant={"h5"}>{label} : {value} {units}</Typography>
        <Stack spacing={2} direction="row" alignItems="center">
            <Slider
                marks={marks}
                valueLabelDisplay="off"
                aria-label="Some setting"
                value={value as number}
                onChange={(_e, newVal) => setValue(key, newVal as number)}
                max={max}
                step={step}
                min={min}
            />
        </Stack>
    </Box>)
})

export default NumericSetting