export default function (chart, model) {
    const {
        ySeries, keys,
    } = chart.series;
    const {
        scalerY,
        onIndicatorChange,
    } = chart;
    model.forEach((m, i) => {
        m.$regist('mouseenter', () => {
            const {
                idx,
                rawdata,
                xl, xr, y,
                sidx,
            } = m.data;
            // location series
            // const top = scalerY(ySeries[ySeries.length - 1][m.data.idx][1]);
            // console.log(m.data.rawdata, top);
            // const pos = m.data.x;
            const key = keys[sidx];
            onIndicatorChange({
                targetPositions: {
                    xl, xr,
                    y: ySeries.map((s) => scalerY(s[idx][1])),
                },
                target: {
                    i: idx, j: sidx,
                    data: {
                        key,
                        keys,
                        value: rawdata[key],
                        values: keys.map((k) => rawdata[k]),
                    },
                },
            });
        });
        m.$regist('mouseleave', () => {
            onIndicatorChange(null);
        });
    });
}
