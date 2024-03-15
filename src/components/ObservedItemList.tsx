import React, {ReactElement} from "react";
import {observer} from "mobx-react-lite";

const ObservedItemList = observer((props: {
    isLoading: boolean,
    isError: boolean,
    items: GenericItem[] | null,
    Component: React.ComponentType<{ item: GenericItem }>
    LoadingFallback: ReactElement
    NotFoundFallback: ReactElement
}) => {
    const {
        items,
        isLoading,
        Component,
        LoadingFallback,
        NotFoundFallback,
        isError
    } = props;

    if (isError) return <div>Error...</div>
    return <>
        {items && items.length != 0 &&
            items.map(item => <Component item={item} key={item.id}/>)}

        {(!items || items.length === 0) && NotFoundFallback}

        {isLoading && LoadingFallback}
    </>
});
export default ObservedItemList;