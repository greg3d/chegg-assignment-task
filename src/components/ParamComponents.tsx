import React from "react"
import {Link as ALink, Stack} from "@mui/material"

export function NumericParamWithIcon(props: {
    single: string
    plural: string
    icon: React.ElementType
    param: number
}) {
    return <Stack gap={1} direction={"row"} alignItems={"center"}>
        <props.icon/>
        <b>{props.param}</b> {props.param === 0 || props.param > 1 ? props.plural : props.single}
    </Stack>
}

export function StringParamWithIcon(props: {
    link: boolean | string | null
    icon: React.ElementType
    param: string | null
}) {

    let linkHref: string = props.link && props.param ? props.param : ""
    if (props.link && typeof props.link === "string") {
        linkHref = props.link
    }

    if (props.param == null) return
    return <Stack gap={1} direction={"row"} alignItems={"center"}>
        <props.icon/>
        {props.link ? <ALink target={"_blank"} href={linkHref}>{props.param}</ALink> : props.param}
    </Stack>
}