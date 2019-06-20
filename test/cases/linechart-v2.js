import {LineChart, AreaChart} from '../../src/line/index'
import StackChart from '../../src/stack/StackChart'

import data from '../data/data-1.json';
import data2 from '../data/data-2.json';
// const keys = ['week', 'number', 'num'];
// const series = keys.slice(1, keys.length).map((k) => ({ key: k }));
// const xSeries = omit(data.result.data, 'week');
// const ySeries = series.map(({ key }, i) => omit(data.result.data, key));

function getContainer() {
    const canvasContainer = document.createElement('div');
    canvasContainer.style.position = 'relative';
    canvasContainer.style.width = '516px';
    canvasContainer.style.height = '368px';
    document.body.appendChild(canvasContainer);
    return canvasContainer;
}
const c1 = getContainer()

const keys = ['startTime', 'avgLatency', 'p95AvgLatency', 'p99AvgLatency'];
const keys2 = ['week', 'number'];
new LineChart(c1, {
    keys: keys2,
    data: data2.result.data,
    padding: {
        left: 30,
        right: 20,
        top: 20,
        bottom: 50,
    },
}).render({tickY: 4 , tickX: 8, chosen: [0, 1, 2]});

const c2 = getContainer();
new AreaChart(c2, {
    keys,
    data: data.result.data,
    padding: {
        left: 30,
        right: 20,
        top: 20,
        bottom: 50,
    },
}).render({tickY: 4 , tickX: 8, chosen: [0, 1, 2]});


const c3 = getContainer();
new StackChart(c3, {
    keys: keys2,
    data: data2.result.data,
    padding: {
        left: 30,
        right: 20,
        top: 20,
        bottom: 50,
    },
}).render({tickY: 4 , tickX: 8, chosen: [0, 1, 2]});


const c4 = getContainer();
new LineChart(c4, {
    keys,
    data: data.result.data,
    padding:{
        left: 30,
        right: 50,
        top: 20,
        bottom: 50,
    },
    smooth: true,
    yAxis: { min: 0, name: '个'},
    xAxis: { key: 'week', name: '日期' },
}).render({})