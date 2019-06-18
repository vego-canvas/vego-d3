function omit(arr, key) {
    return arr.map((r) => r[key]);
}
export default function (keys, data) {
    // const options = {
    //     month: 'numeric', day: 'numeric',
    //     hour: 'numeric', minute: 'numeric',
    //     hour12: false,
    // };

    const series = keys.slice(1, keys.length).map((k) => ({ key: k }));
    const xSeries = omit(data, keys[0]);
    const ySeries = series.map(({ key }, i) => omit(data, key));
    return {
        xSeries, ySeries, keys: keys.slice(1),
    };
}
