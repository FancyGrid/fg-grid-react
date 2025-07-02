'use strict';

var React = require('react');
var fgGrid = require('fg-grid');

function _interopNamespaceDefault(e) {
    var n = Object.create(null);
    if (e) {
        Object.keys(e).forEach(function (k) {
            if (k !== 'default') {
                var d = Object.getOwnPropertyDescriptor(e, k);
                Object.defineProperty(n, k, d.get ? d : {
                    enumerable: true,
                    get: function () { return e[k]; }
                });
            }
        });
    }
    n.default = e;
    return Object.freeze(n);
}

var React__namespace = /*#__PURE__*/_interopNamespaceDefault(React);

// Don't change the way of React import
// It was done to prevent error in dist folder
// Using forwardRef to support versions that less than 19
const FGGridReact = React.forwardRef(function FGGridReact(props, ref) {
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
    React.useImperativeHandle(ref, () => gridRef.current, []);
    return React__namespace.createElement("div", { style: { height: '100%' }, ref: gridContainerRef });
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

exports.FGGridReact = FGGridReact;
