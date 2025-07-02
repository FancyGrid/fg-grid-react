import * as React from 'react';
import { forwardRef, useRef, useEffect, useImperativeHandle } from 'react';
import { Grid } from 'fg-grid';

// Don't change the way of React import
// It was done to prevent error in dist folder
// Using forwardRef to support versions that less than 19
const FGGridReact = forwardRef(function FGGridReact(props, ref) {
    const propsRef = useRef(null);
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
    useImperativeHandle(ref, () => gridRef.current, []);
    return React.createElement("div", { style: { height: '100%' }, ref: gridContainerRef });
});
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
