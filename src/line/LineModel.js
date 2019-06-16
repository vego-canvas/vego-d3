import { line, curveMonotoneX } from 'd3-shape';
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
    return ySeries.map((data, s) => data && new DisplayObject({ render(g) {
        g.beginPath();
        const l = line()
            .x((d, i) => scalerX(xSeries[i]))
            .y((d) => scalerY(d))
            .curve(curveMonotoneX);
        l.context(g)(data);

        g.setLineWidth(1.5).setStrokeStyle(colors[s] || '#000').stroke();
    } })).filter((i) => i);
}
