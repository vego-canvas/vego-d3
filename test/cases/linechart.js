import Chart from '../../src/index';
import Axis from '../../src/axisModel/axis-cloudui';
import Model from '../../src/model/line';
import Indicator from '../../src/indicator/indicator-cloudui';
import LinearLayer from '../../src/dataLayer/linear';


import data from '../data/data-1.json';


// import data from '../data/data-2.json';
// const keys = ['week', 'number', 'num'];
// const series = keys.slice(1, keys.length).map((k) => ({ key: k }));
// const xSeries = omit(data.result.data, 'week');
// const ySeries = series.map(({ key }, i) => omit(data.result.data, key));

const canvasContainer = document.createElement('div');
canvasContainer.style.position = 'relative';
canvasContainer.style.width = '800px';
canvasContainer.style.height = '600px';
document.body.appendChild(canvasContainer);
const keys = ['startTime', 'avgLatency', 'p95AvgLatency', 'p99AvgLatency'];
const chart = new Chart(canvasContainer, {
    keys,
    data: data.result.data,
    dataLayer: LinearLayer,

    Axis, Model, Indicator,
    padding: {
        left: 30,
        right: 20,
        top: 20,
        bottom: 50,
    },
});
chart.render({tickY: 4 , tickX: 8, chosen: [0, 1, 2]});
