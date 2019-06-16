import {
    DisplayObject,
} from 'vegocore';
import {
    colors, colorsAlpha,
} from '../common/colors-cloudui';

export default function ({
    series,
    scalerX, scalerY,
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
            };
            g.beginPath()
                .setFillStyle(colorsAlpha[sidx])
                .setStrokeStyle(colorsAlpha[sidx])
                .fillRect(x, y, width, height)
                .strokeRect(x, y, width, height);
        },
    }))), []);
}
