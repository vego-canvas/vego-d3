import {
    DisplayObject,
} from 'vegocore';
import {
    colorsDark, colorsDarkAlpha,
} from '../common/colors-cloudui';

export default function ({
    scalerX, scalerY, padding, bounds, canvas,
    scalerYInvert, scalerXInvert, series,
    onIndicatorChange,
}) {
    const {
        width, height,
    } = bounds;
    const {
        xSeries, ySeries, keys,
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
    let lastPosition = null;
    canvasEle.addEventListener('mouseleave', (event) => {
        Indicator.$visible = false;
        canvas.render();
        lastPosition = null;
        onIndicatorChange(null);
    });

    canvasEle.addEventListener('mousemove', (event) => {
        Indicator.$visible = true;
        const x = event.offsetX;
        const y = event.offsetY;

        const eachBand = scalerX.step();
        const t = scalerX(xSeries[0]);
        // mouse position
        const xm = x - t;
        const ym = scalerY.invert(y);
        // 列
        const i = scalerXInvert(xm);
        // 行
        let j = 0;
        ySeries.reduce((a, b, idx) => {
            const condition = Math.abs(a[i] - ym) < Math.abs(b[i] - ym);
            if (!condition)
                j = idx;
            return condition ? a : b;
        });

        const targetPoints = [];
        ySeries.forEach((a) => {
            targetPoints.push(a[i]);
        });
        Indicator.$visible = true;
        Indicator.targetPoints = targetPoints.map((t, idx) => ({
            pt: scalerY(t),
            fill: colorsDark[idx],
        }));
        const pos = i * eachBand + t;
        Indicator.$geometry.x = pos;
        Indicator._appendTransform();
        if (lastPosition !== pos) {
            onIndicatorChange({
                targetPositions: {
                    x: pos,
                    y: Indicator.targetPoints.map((t) => t.pt),
                },
                target: {
                    i, j,
                    data: {
                        key: keys[j],
                        keys,
                        value: ySeries[j][i],
                        values: ySeries.map((_, idx) => ySeries[idx][i]),
                    },
                },
            });
        }

        canvas.render();
    });

    return Indicator;
}
