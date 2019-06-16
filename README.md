# Vego + D3 -- canvas charts

## Usage
``` javascript
import { LineChart, AreaChart, StackChart } from 'vego-d3'

const keys = ['startTime', 'avgLatency', 'p95AvgLatency', 'p99AvgLatency'];
import data from '../data/data-1.json';

new LineChart(c1, {
    keys,
    data: data.result.data,
    padding: {
        left: 30,
        right: 20,
        top: 20,
        bottom: 50,
    },
}).render({tickY: 4 , tickX: 8, chosen: [0, 1, 2]});

```

## data format
Keys matches every rows in data
+ keys: Array<string>
+ data: Array<Array<Number>>
