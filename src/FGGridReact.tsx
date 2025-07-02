// Don't change the way of React import
// It was done to prevent error in dist folder
import * as React from 'react';
import { useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import { Grid } from 'fg-grid';
import type { GridConfig } from 'fg-grid';

// Using forwardRef to support versions that less than 19
const FGGridReact = forwardRef(function FGGridReact<TData = any>(
  props: GridConfig<TData>,
  ref: React.Ref<Grid | undefined>
) {
  const propsRef = useRef<GridConfig<TData>>(null);
  const gridContainerRef = useRef<HTMLDivElement | null>(null);
  const gridRef = useRef<Grid<TData> | null>(null);

  useEffect(() => {
    if(!gridRef.current){
      gridRef.current = new Grid({
        renderTo: gridContainerRef.current!,
        ...props
      });

      propsRef.current = props;
    }
    else{
      const propsChanges = getPropsChanges(propsRef.current, props);

      if(gridRef.current) {
        if(propsChanges.data){
          gridRef.current?.setData(propsChanges.data);
        }

        if(propsChanges.columns){
          gridRef.current?.setColumns(propsChanges.columns);
        }
      }

      propsRef.current = props;
    }
  }, [props]);

  useImperativeHandle(ref, () => gridRef.current!, []);

  return <div style={{height: '100%'}} ref={gridContainerRef}></div>;
})  as <TData>(
  props: GridConfig<TData> & { ref?: React.Ref<Grid | undefined> }
) => React.ReactElement;

const getPropsChanges = (prevProps: any, nextProps: any): { [p: string]: any } => {
  const changes: {
    [p: string]: any
  } = {};

  Object.keys(nextProps).forEach(propKey => {
    const propValue = nextProps[propKey];

    if(prevProps[propKey] !== propValue){
      changes[propKey] = propValue;
    }
  });

  return changes;
}

export default FGGridReact;
