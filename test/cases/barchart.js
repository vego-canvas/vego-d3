import Chart from '../../src/index';
import Axis from '../../src/axisModel/axis-cloudui';
import Model from '../../src/model/line';
import Indicator from '../../src/indicator/indicator-cloudui';


function omit(arr, key) {
    return arr.map((r) => r[key]);
}
import data from '../data/data-1.json';
const options = {
    month: 'numeric', day: 'numeric',
    hour: 'numeric', minute: 'numeric',
    hour12: false,
  };
const keys = ['startTime', 'avgLatency', 'p95AvgLatency', 'p99AvgLatency'];
const series = keys.slice(1, keys.length).map((k) => ({ key: k }));
const xSeries = omit(data.result.data, 'startTime').map((dt) => new Intl.DateTimeFormat('zh-CN', options).format(new Date(dt)))
const ySeries = series.map(({ key }, i) => omit(data.result.data, key));

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
const chart = new Chart(canvasContainer, {
    xSeries, ySeries,
    Axis, Model, Indicator,
    padding: {
        left: 30,
        right: 20,
        top: 20,
        bottom: 50,
    },
});
chart.render({tickY: 4 , tickX: 8, chosen: [0, 1, 2]});
