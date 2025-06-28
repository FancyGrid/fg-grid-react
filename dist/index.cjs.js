'use strict';

var React = require('react');
var fgGrid = require('fg-grid');

const FGGridReact = (props) => {
    const propsRef = React.useRef(null);
    const gridContainerRef = React.useRef(null);
    const gridRef = React.useRef(null);
    React.useEffect(() => {
        if (!gridRef.current) {
            gridRef.current = new fgGrid.Grid({
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

exports.FGGridReact = FGGridReact;
