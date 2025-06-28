import React, { useEffect, useRef} from 'react';
import { Grid } from 'fg-grid';
import type { GridConfig } from 'fg-grid';

const FGGridReact = <TData = any>(props: GridConfig<TData>) => {
  const propsRef = useRef<GridConfig<TData>>(null);
  const gridContainerRef = useRef<HTMLDivElement | null>(null);
  const gridRef = useRef<Grid<TData> | null>(null);

  useEffect(() => {
    if(!gridRef.current){
      gridRef.current = new Grid({
        renderTo: gridContainerRef.current,
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

  return <div style={{height: '100%'}} ref={gridContainerRef}></div>;
};

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
