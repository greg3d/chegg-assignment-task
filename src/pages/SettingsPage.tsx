import {Box, FormControlLabel, Stack, Switch, Typography} from "@mui/material"
import {useStore} from "../stores/RootStore.ts"
import NumericSetting from "../components/NumericSetting.tsx"
import Brightness4Icon from "@mui/icons-material/Brightness4"
import Brightness7Icon from "@mui/icons-material/Brightness7"
import UIStore from "../stores/UIStore.ts"
import {observer} from "mobx-react-lite"

const ThemeToggler = observer((props: { ui: UIStore, onChange: () => void }) => {
    return <Box sx={{
        borderWidth: "1px", borderStyle: "solid", borderColor: "divider", borderRadius: 2,
        my: 3, py: 1, px: 3
    }}>
        <Stack direction={"row"} alignItems={"center"} gap={2}>
            {props.ui.getSetting("theme") === "light" ? <Brightness7Icon/> : <Brightness4Icon/>}
            <FormControlLabel control={<Switch
                value={props.ui.getSetting("theme")}
                checked={props.ui.getSetting("theme") === "dark"}
                onChange={() => props.onChange()}
            />} label="Theme Mode"/>
        </Stack>
    </Box>
})

const SettingsPage = () => {
    const {ui} = useStore()

    return (
        <Box>
            <Typography variant={"h2"}>
                App Settings
            </Typography>
            <ThemeToggler ui={ui} onChange={ui.toggleTheme}/>
            <NumericSetting
                label="Search Prompt Debounce"
                units="ms"
                keyAndDefault={{key: "searchPromptDebounce", defaultValue: 300}}
                getValue={ui.getSetting}
                setValue={ui.updateSetting}
                max={1000}
                min={100}
                step={50}
            />
            <NumericSetting
                label="Search Fetch Debounce"
                units="ms"
                keyAndDefault={{key: "searchFetchDebounce", defaultValue: 300}}
                getValue={ui.getSetting}
                setValue={ui.updateSetting}
                max={2000}
                min={0}
                step={100}
            />
            <NumericSetting
                label="Results Per Page"
                units="items"
                keyAndDefault={{key: "resultsPerPage", defaultValue: 24}}
                getValue={ui.getSetting}
                setValue={ui.updateSetting}
                max={72}
                min={12}
                step={12}
            />
        </Box>)
}

export default SettingsPage