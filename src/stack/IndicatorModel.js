export default function (chart, model) {
    const {
        ySeries,
    } = chart.series;
    const {
        scalerY,
    } = chart;
    model.forEach((m) => {
        m.$regist('mouseenter', () => {
            // location series
            const top = scalerY(ySeries[ySeries.length - 1][m.data.idx][1]);
            console.log(m.data.rawdata, top);
        });
        m.$regist('mouseleave', () => {
            console.log('mouseleave');
        });
    });
}
