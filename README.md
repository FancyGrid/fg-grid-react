# FG-Grid

FG-Grid - Open source data grid library for building enterprise applications

<div align="center">
    <picture>
      <img width="100%" alt="FG-Grid" src="https://www.fg-grid.com/img/car-dealer-store-2.png"/>
    </picture>
</div>

## Install

#### *npm*
```
npm install fg-grid fg-grid-react-wrapper
```

## Quick Start

```jsx
import React, { useState } from 'react';
import { Column } from 'fg-grid';
import {
FGGridReact
} from 'fg-grid-react-wrapper';

function App(){
  const [columns, setColumns] = useState([...]);
  const [data, setData] = useState([...]);

  return (
    <div className="App">
      <div style={{width: '100%', height: '300px'}}>
        <FGGridReact
          defaults={{
            sortable: true
          }}
          columns={columns}
          data={data}
          rowStyle={(params)=>{
            if(Number(params.item.price) > 55000){
              return {
                'background-color': 'rgba(220, 107, 103, 0.2)'
              }
            }
          }
        />
      </div>
    </div>
  );
}

export default App;
```

## Support
If you need any assistance or would like to report any bugs found in FancyGrid, please contact us at support@fancygrid.com
