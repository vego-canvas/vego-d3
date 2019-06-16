import { stack } from 'd3-shape';
function omit(arr, key) {
    return arr.map((r) => r[key]);
}
export default function (keys, data) {
    const ySeries = stack().keys(keys.slice(1))(data);
    const xSeries = omit(data, keys[0]);
    return {
        xSeries, ySeries,
    };
}
