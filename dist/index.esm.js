import React, { useRef, useEffect } from 'react';
import { Grid } from 'fg-grid';

const FGGridReact = (props) => {
    const propsRef = useRef();
    const gridContainerRef = useRef(null);
    const gridRef = useRef(null);
    useEffect(() => {
        if (!gridRef.current) {
            gridRef.current = new Grid({
                renderTo: gridContainerRef.current,
                ...props
            });
            propsRef.current = props;
        }
        else {
            const propsChanges = getPropsChanges(propsRef.current, props);
            if (gridRef.current) {
                if (propsChanges.data) {
                    gridRef.current?.setData(propsChanges.data);
                }
                if (propsChanges.columns) {
                    gridRef.current?.setColumns(propsChanges.columns);
                }
            }
            propsRef.current = props;
        }
    }, [props]);
    return React.createElement("div", { style: { height: '100%' }, ref: gridContainerRef });
};
const getPropsChanges = (prevProps, nextProps) => {
    const changes = {};
    Object.keys(nextProps).forEach(propKey => {
        const propValue = nextProps[propKey];
        if (prevProps[propKey] !== propValue) {
            changes[propKey] = propValue;
        }
    });
    return changes;
};

export { FGGridReact };
