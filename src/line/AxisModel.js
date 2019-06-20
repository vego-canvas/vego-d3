import {
    DisplayObject,
    TextDisplayObject,
} from 'vegocore';
import { xAxisSpaceBetween } from '../common/x-axis-space-between';

export default function (tickX, tickY, {
    series,
    scalerX, scalerY,
    padding,
    bounds,
    scalerYInvert,
    tickFormatFunc,
    styles,
    canvas,
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
    const tickFormat = scalerY.tickFormat(tickY, tickFormatFunc ? tickFormatFunc() : '.2d');

    function generateText(content) {
        const text = new TextDisplayObject(content, {
            lineWidth: Math.ceil((width - left - right) / tickX),
            textAlign: 'center',
            textVerticalAlign: 'middle',
            font: styles.xAxisFont,
            color: styles.xfontColor,
        });
        text.$geometry.y = height - bottom + styles.xFontMarginTop;

        return text;
    }
    const {
        xticksDisplay,
        xticksText,
    } = xAxisSpaceBetween(xSeries, tickX, generateText);
    xticksDisplay.forEach((d, idx) => {
        const t = scalerX(d);
        xticksText[idx].$geometry.x = t;
        xticksText[idx]._appendTransform();
    });
    const {
        xAxisEdgeColor,
        gridColor,
    } = styles;
    const axis = new DisplayObject({ render(g) {
        const w = left;
        const h = height - bottom;
        const t = scalerX(xticksDisplay[0]);
        const tmax = scalerX(xticksDisplay[xticksDisplay.length - 1]);
        // draw grid
        g.beginPath()
            .moveTo(t, h);
        xticksDisplay.forEach((d) => {
            const t = scalerX(d);
            g.lineTo(t, h)
                .lineTo(t, h + 6)
                .moveTo(t, h);
        });
        g.setStrokeStyle(xAxisEdgeColor || gridColor).stroke();

        g.beginPath();
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

        g.setStrokeStyle(gridColor).stroke();

        g.setTextAlign('center')
            .setTextBaseline('top')
            .setFont(styles.yAxisFont)
            .setFillStyle(styles.yfontColor);
        yticksDisplay.forEach((d) => {
            g.fillText(tickFormat(d), w - styles.yFontMarginRight, scalerY(d) - 5);
        });

        if (needTopLine) {
            g.fillText(tickFormat(scalerYInvert(top)), w - 15, top - 5);
        }
    } });
    xticksText.forEach((l) => axis.addChild(l));
    return axis;
}
