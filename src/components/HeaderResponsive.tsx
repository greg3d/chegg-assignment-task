import {
    AppBar,
    Box,
    Button,
    Divider,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Toolbar,
    Typography
} from "@mui/material"
import {Menu as MenuIcon} from "@mui/icons-material"
import {menu} from "../routes/pages.ts"
import {useCallback, useRef, useState} from "react"
import CustomLink from "./CustomLink.tsx"

interface Props {
    items: { title: string, path: string }[]
}

const HeaderResponsive = ({items}: Props) => {

    const container = window !== undefined ? () => window.document.body : undefined

    const startX = useRef(0)
    const deb = useRef(0)

    const touchStartHandler = useCallback((ev: TouchEvent) => {
        startX.current = ev.touches[0].clientX
    }, [])

    const touchMoveHandler = useCallback((ev: TouchEvent) => {
        clearTimeout(deb.current)
        deb.current = setTimeout(() => {
            if (startX.current > ev.touches[0].clientX) {
                setIsOpen(false)
            } else {
                setIsOpen(true)
            }
        }, 75)
    }, [])

    if (container) {
        container().ontouchstart = touchStartHandler
        container().ontouchmove = touchMoveHandler
    }

    const [isOpen, setIsOpen] = useState(false)

    return (
        <>
            <AppBar component="nav" position={"sticky"} sx={{
                mb: 2
            }}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={() => setIsOpen(val => !val)}
                        sx={{mr: 1, display: {sm: "none"}}}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{flexGrow: 1}}
                    >
                        GitHub Browser
                    </Typography>
                    <Box sx={{display: {xs: "none", sm: "block"}}}>
                        {menu.map((item) => (
                            <CustomLink
                                key={item.title}
                                to={item.path}
                                children={
                                    <Button sx={{color: "#fff"}}>{item.title}</Button>
                                }/>

                        ))}
                    </Box>
                </Toolbar>
            </AppBar>

            <Drawer
                container={container}
                variant="temporary"
                open={isOpen}
                onClose={(val) => setIsOpen(!val)}
                ModalProps={{
                    keepMounted: true // Better isOpen performance on mobile.
                }}
                sx={{
                    display: {xs: "block", sm: "none"},
                    "& .MuiDrawer-paper": {boxSizing: "border-box", width: 240}
                }}
            >
                <Box sx={{ml: 2}}>
                    <Typography variant="h6" sx={{my: 2}}>
                        GitHub Browser
                    </Typography>
                    <Divider/>
                    <List>
                        {items.map((item) => (
                            <ListItem key={item.title} disablePadding>
                                <ListItemButton sx={{textAlign: "left"}}>
                                    <ListItemText primary={item.title}/>
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Drawer>

        </>
    )
}

export default HeaderResponsive