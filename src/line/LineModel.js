import { line, curveMonotoneX } from 'd3-shape';
import {
    DisplayObject,
} from 'vegocore';
import {
    colorsDark, colorsDarkAlpha,
} from '../common/colors-cloudui';

export default function ({
    series,
    scalerX, scalerY,
    smooth,
}) {
    const {
        xSeries, ySeries,
    } = series;
    return ySeries.map((data, s) => data && new DisplayObject({ render(g) {
        g.beginPath();
        const l = line()
            .x((d, i) => scalerX(xSeries[i]))
            .y((d) => scalerY(d));
        if (smooth)
            l.curve(curveMonotoneX);
        l.context(g)(data);

        g.setLineWidth(1.5).setStrokeStyle(colorsDark[s] || '#000').stroke();
    } })).filter((i) => i);
}
