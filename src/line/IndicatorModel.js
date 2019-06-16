import {
    DisplayObject,

} from 'vegocore';
import {
    colors,
} from '../common/colors-cloudui';

export default function ({
    scalerX, scalerY, padding, bounds, canvas,
    scalerYInvert, scalerXInvert, series,
}) {
    const {
        width, height,
    } = bounds;
    const {
        xSeries, ySeries,
    } = series;

    const PI2 = Math.PI * 2;
    const Indicator = new DisplayObject({
        render(g) {
            g.beginPath()
                .moveTo(0, padding.top)
                .lineTo(0, height - padding.bottom)
                .setStrokeStyle('rgba(0,0,0,.2)')
                .stroke();
            if (this.targetPoints) {
                this.targetPoints.forEach((p) => {
                    g.beginPath()
                        .arc(0, p.pt, 5, 0, PI2)
                        .setFillStyle(p.fill)
                        .fill();
                });
            }
        },
    });

    Indicator.$visible = false;

    canvas.addChild(Indicator);
    const canvasEle = canvas.canvas;
    canvasEle.addEventListener('mouseleave', (event) => {
        Indicator.$visible = false;
        canvas.render();
    });
    canvasEle.addEventListener('mousemove', (event) => {
        Indicator.$visible = true;
        const x = event.offsetX;

        const eachBand = scalerX.step();
        const t = scalerX(xSeries[0]);
        const xm = x - t;
        const i = scalerXInvert(xm);
        const targetPoints = [];
        ySeries.forEach((a) => {
            targetPoints.push(a[i]);
        });
        Indicator.$visible = true;
        Indicator.targetPoints = targetPoints.map((t, idx) => ({
            pt: scalerY(t),
            fill: colors[idx],
        }));
        Indicator.$geometry.x = i * eachBand + t;
        Indicator._appendTransform();

        canvas.render();
    });

    return Indicator;
}
