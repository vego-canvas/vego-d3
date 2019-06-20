export function xAxisSpaceBetween(series, tickX, generateText) {
    const l = series.length;
    const xticksspan = Math.ceil(l / tickX);

    const xticksDisplay = [];
    const xticksText = [];
    let i = 0;
    while (i < series.length) {
        xticksDisplay.push(series[i]);
        xticksText.push(generateText(series[i]));
        i += xticksspan;
    }
    if (xticksDisplay.length < series.length) {
        xticksDisplay.push(series[l - 1]);
        xticksText.push(generateText(series[l - 1]));
    }
    return {
        xticksDisplay,
        xticksText,
    };
}
