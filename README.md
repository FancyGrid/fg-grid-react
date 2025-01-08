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
import React, {useState} from 'react';
import {
  FGGridReact
} from 'fg-grid-react-wrapper';

const initialData = [
  { brand: "Lexus", model: "RX 350", price: 60000, year: 2021 },
  { brand: "Lexus", model: "NX 300", price: 50000, year: 2023 },
  { brand: "Toyota", model: "Land Cruiser Prado", price: 70000, year: 2022 },
  { brand: "Toyota", model: "RAV4", price: 35000, year: 2023 },
  { brand: "Volkswagen", model: "Tiguan", price: 38000, year: 2021 },
  { brand: "Volkswagen", model: "Touareg", price: 75000, year: 2023 },
  { brand: "Volkswagen", model: "Teramont", price: 60000, year: 2023 },
  { brand: "Mazda", model: "CX-9", price: 45000, year: 2023 },
  { brand: "Honda", model: "Pilot", price: 45000, year: 2023 },
  { brand: "Nissan", model: "Pathfinder", price: 48000, year: 2022 },
  { brand: "Hyundai", model: "Palisade", price: 50000, year: 2023 },
  { brand: "Kia", model: "Sorento", price: 40000, year: 2023 },
  { brand: "Ford", model: "Edge", price: 42000, year: 2021 },
  { brand: "Chevrolet", model: "Traverse", price: 45000, year: 2023 }
];

const initialColumns = [{
  index: 'brand',
  title: 'Brand',
  type: 'string'
},{
  index: 'model',
  title: 'Model',
  type: 'string'
},{
  index: 'price',
  title: 'Price',
  type: 'currency'
},{
  index: 'year',
  title: 'Year',
  type: 'number'
}]

function App(){
  const [data, setData] = useState(initialData);
  const [columns, setColumns] = useState(initialColumns);

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
          }}
        />
      </div>
    </div>
  );
}

export default App;
```

## Support
If you need any assistance or would like to report any bugs found in FancyGrid, please contact us at support@fancygrid.com
