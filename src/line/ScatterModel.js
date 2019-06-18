import {
    DisplayObject,
} from 'vegocore';
import {
    colorsDark, colorsDarkAlpha,
} from '../common/colors-cloudui';

export default function ({
    series,
    scalerX, scalerY,
}) {
    const {
        xSeries, ySeries,
    } = series;
    const PI2 = Math.PI * 2;
    return ySeries.map((data, s) => data && new DisplayObject({ render(g) {
        g.beginPath();
        g.setFillStyle(colorsDark[s]);

        xSeries.forEach((s, idx) => {
            g.beginPath();
            const y = scalerY(data[idx]);
            const x = scalerX(s);
            g.arc(x, y, 3, 0, PI2);
            g.fill();
        });
    } })).filter((i) => i);
}
