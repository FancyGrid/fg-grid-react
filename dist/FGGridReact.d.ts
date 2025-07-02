import * as React from 'react';
import { Grid } from 'fg-grid';
import type { GridConfig } from 'fg-grid';
declare const FGGridReact: <TData>(props: GridConfig<TData> & {
    ref?: React.Ref<Grid | undefined>;
}) => React.ReactElement;
export default FGGridReact;
