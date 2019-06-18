import {
    DisplayObject,
    TextDisplayObject,
} from 'vegocore';

export default function (tickX, tickY, {
    series,
    scalerX, scalerY,
    padding,
    bounds,
    scalerYInvert,
}) {
    const {
        left, right, bottom, top,
    } = padding;
    const {
        width, height,
    } = bounds;
    const {
        xSeries,
    } = series;
    const yticksDisplay = scalerY.ticks(tickY);
    const tickFormat = scalerY.tickFormat(tickY, '.2s');

    const xticksspan = Math.ceil(xSeries.length / tickX);
    const xticksDisplay = [];
    const xticksText = [];
    let i = 0;
    function generateText(content) {
        const text = new TextDisplayObject(content, {
            lineWidth: ((width - left - right) / tickX - 10) * 2,
            textAlign: 'center',
            font: '24px sans-serif',
        });
        text.$geometry.y = height - bottom + 10;
        text.$geometry.scaleX = text.$geometry.scaleY = 0.5;
        return text;
    }
    // const xticksText = xSeries.map(generateText);
    while (i < xSeries.length) {
        xticksDisplay.push(xSeries[i]);
        xticksText.push(generateText(xSeries[i]));
        i += xticksspan;
    }
    if (xticksDisplay.length < xSeries.length) {
        xticksDisplay.push(xSeries[xSeries.length - 1]);
        xticksText.push(generateText(xSeries[xSeries.length - 1]));
    }
    const axis = new DisplayObject({ render(g) {
        const w = left;
        const h = height - bottom;
        const t = scalerX(xSeries[0]);
        const tmax = scalerX(xSeries[xSeries.length - 1]) + scalerX.bandwidth();
        g.beginPath();

        xSeries.forEach((d) => {
            const leftBorder = scalerX(d);
            // const rightBorder = scalerX(d) + scalerX.bandwidth();
            g.moveTo(leftBorder, top);
            g.lineTo(leftBorder, h);
            // g.moveTo(rightBorder, h);
            // g.lineTo(rightBorder, h + 6);
        });
        g.moveTo(tmax, top);
        g.lineTo(tmax, h);

        g.moveTo(t, h)
            .lineTo(tmax, h)
            .moveTo(t, h);
        yticksDisplay.forEach((d, i) => {
            if (i === 0)
                return;
            const yd = scalerY(d);
            g.moveTo(t, yd)
                .lineTo(tmax, yd)
                .moveTo(t, yd);
        });
        const needTopLine = Math.abs(scalerY(yticksDisplay[yticksDisplay.length - 1]) - top) > 20;
        if (needTopLine) {
            g.moveTo(t, top)
                .lineTo(tmax, top);
        }

        g.setStrokeStyle('#eee').stroke();

        g.setTextAlign('center')
            .setTextBaseline('top');
        xticksDisplay.forEach((d, idx) => {
            const t = scalerX(d);
            xticksText[idx].$geometry.x = t + scalerX.bandwidth() / 2;
            xticksText[idx]._appendTransform();
            // g.fillText(d, t, h + 6);
        });
        yticksDisplay.forEach((d) => {
            g.fillText(tickFormat(d), w - 15, scalerY(d) - 5);
        });
        if (needTopLine) {
            g.fillText(tickFormat(scalerYInvert(top)), w - 15, top - 5);
        }
    } });
    xticksText.forEach((l) => axis.addChild(l));
    return axis;
}
