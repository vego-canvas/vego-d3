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
        xticksText[idx].$geometry.x = t + scalerX.bandwidth() / 2;
        xticksText[idx]._appendTransform();
    });
    const {
        xAxisEdgeColor,
        yAxisEdgeColor,
        gridColor,
    } = styles;
    const axis = new DisplayObject({ render(g) {
        const w = left;
        const h = height - bottom;
        const t = scalerX(xSeries[0]);
        const tmax = scalerX(xSeries[xSeries.length - 1]) + scalerX.bandwidth();
        g.beginPath();

        xSeries.forEach((d) => {
            const leftBorder = scalerX(d);
            g.moveTo(leftBorder, top);
            g.lineTo(leftBorder, h);
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

        g.setStrokeStyle(gridColor).stroke();
        if (xAxisEdgeColor)
            g.beginPath()
                .moveTo(t, h)
                .lineTo(tmax, h)
                .setStrokeStyle(xAxisEdgeColor).stroke();

        if (yAxisEdgeColor)
            g.beginPath()
                .moveTo(t, top)
                .lineTo(t, h)
                .setStrokeStyle(yAxisEdgeColor).stroke();

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
