import {
    DisplayObject,
} from 'vegocore';
// import {
//     colors, colorsAlpha,
// } from '../common/colors-cloudui';

export default function ({
    series,
    scalerX, scalerY,
    colors,
}) {
    const {
        xSeries, ySeries,
    } = series;
    return ySeries.reduce((accu, ys, sidx) => accu.concat(xSeries.map((s, idx) => new DisplayObject({
        render(g) {
            const [y0, y1] = ys[idx];
            const t = scalerX(s);
            const x = t + scalerX.bandwidth() / 4;
            const width = scalerX.bandwidth() / 2;
            const y = scalerY(y1);
            const height = scalerY(y0) - y;
            this.data = {
                idx,
                rawdata: ys[idx].data,
                xl: x, xr: x + width, y,
                sidx,
            };
            g.beginPath()
                .setFillStyle(colors[sidx].fill)
                .setStrokeStyle(colors[sidx].stroke)
                .fillRect(x, y, width, height)
                .strokeRect(x, y, width, height);
        },
    }))), []);
}
