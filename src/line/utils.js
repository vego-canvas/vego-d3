const requiredProps = ['keys', 'data'];
export function checkOption(options) {
    const required = requiredProps.map((k) => !options[k] && k).filter((i) => i);
    if (required.length > 0) {
        throw new Error(`[${required.join(',')}] in options is required`);
    }
    return options;
}
export function checkSeries({ keys, data }, dataLayer) {
    if (Array.isArray(keys) && Array.isArray(data)) {
        if (keys.length === data[0].length) {
            throw new Error(`keys's length do not match data's length`);
        }
    }
    return dataLayer(keys, data);
}

export function scaleBandInvert(scale) {
    const domain = scale.domain();
    const eachBand = scale.step();
    return function (value) {
        const i0 = Math.floor((value / eachBand));
        const i1 = i0 + 1;
        const index = value - i0 * eachBand > i1 * eachBand - value ? i1 : i0;
        return Math.max(0, Math.min(index, domain.length - 1));
    };
}
