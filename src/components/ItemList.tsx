import React from "react";

const ItemList = (props: {
    isLoading: boolean,
    isError: any,
    items: GenericItem[],
    Component: React.ComponentType<{ item: GenericItem }>
}) => {
    const {items, isLoading, Component, isError:Error} = props;
    if (isLoading) return <div>Loading...</div>
    if (Error) return <div>{Error}...</div>
    return <>{items.length != 0 && items.map(item => <Component item={item} key={item.id}/>)}</>
}

export default ItemList;