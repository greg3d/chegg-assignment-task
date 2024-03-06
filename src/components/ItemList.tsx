import React from "react";

const ItemList = (props: {
    isLoading: boolean,
    items: GenericItem[],
    Component: React.ComponentType<{ item: GenericItem }>
}) => {
    const {items, isLoading, Component} = props;
    if (isLoading) return <div>Loading...</div>
    return <>{items.length != 0 && items.map(item => <Component item={item} key={item.id}/>)}</>
}

export default ItemList;