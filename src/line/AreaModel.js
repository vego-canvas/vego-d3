import { line, area, curveMonotoneX } from 'd3-shape';
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
    return ySeries.map((data, s) => new DisplayObject({ render(g) {
        g.beginPath();
        const zones = area()
            .x((d, i) => scalerX(xSeries[i]))
            .y0(scalerY(0))
            .y1((d) => scalerY(d));
        if (smooth)
            zones.curve(curveMonotoneX);

        zones.context(g)(data);

        g.setLineWidth(1.5)
            .setFillStyle(colorsDarkAlpha[s]).fill();

        g.beginPath();
        const l = line()
            .x((d, i) => scalerX(xSeries[i]))
            .y((d) => scalerY(d));
        if (smooth)
            l.curve(curveMonotoneX);

        l.context(g)(data);
        g.setLineWidth(1.5).setStrokeStyle(colorsDark[s] || '#000').stroke();
    } }));
}
