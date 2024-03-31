import React, {ReactElement} from "react"
import {observer} from "mobx-react-lite"

const ObservedItemList = observer((props: {
    isLoading: boolean,
    isError: boolean,
    isEmpty: boolean,
    items: GenericItem[] | null,
    Component: React.ComponentType<{ item: GenericItem }>
    LoadingFallback: ReactElement,
}) => {
    const {
        items,
        isLoading,
        Component,
        LoadingFallback
    } = props
    return <>
        {items && items.length !== 0 &&
            items.map(item => <Component item={item} key={item.id}/>)}
        {isLoading && LoadingFallback}
    </>
})
export default ObservedItemList