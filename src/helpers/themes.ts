import {createTheme} from "@mui/material"

export const lightTheme = createTheme({
    palette: {
        mode: "light"

    }
})

export const darkTheme = createTheme({
    palette: {
        mode: "dark",
        primary: {
            main: "#fde468"
        },
        secondary: {
            main: "#26c223"
        }
    }
})