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

  const initGrid = () => {
    gridRef.current = new Grid({
      renderTo: gridContainerRef.current!,
      ...props
    });

    propsRef.current = props;
  }

  useEffect(() => {
    if(!gridRef.current){
      initGrid();
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

        if(propsChanges.loading === false){
          gridRef.current?.hideLoading();
        }

        if(propsChanges.loading === true){
          gridRef.current?.showLoading();
        }

        if(typeof propsChanges.loading === 'string'){
          gridRef.current?.showLoading(propsChanges.loading);
        }
      }

      propsRef.current = props;
    }
  }, [props]);

  useImperativeHandle(ref, () => {
    if(!gridRef.current){
      initGrid();
    }

    return gridRef.current!
  }, []);

  return <div style={{height: '100%', overflow: 'hidden'}} ref={gridContainerRef}></div>;
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
