function transparency(c) {
    const [_, r, g, b] = /rgb\((\d+),(\d+),(\d+)\)/.exec(c);
    return `rgba(${r},${g},${b}, 0.6)`;
}
export const colors = [
    'rgb(91,161,242);',
    'rgb(78,201,171)',
    'rgb(255,174,60)',
    'rgb(158,156,246)',
    'rgb(30,192,216)',
    'rgb(237,139,204)',
    'rgb(138,209,153)',
    'rgb(103,197,245)',
    'rgb(138,205,78)',
    'rgb(245,131,122)',
    'rgb(198,156,246)',
    'rgb(137,170,247)',
    'rgb(251,155,108)',
    'rgb(103,170,245)',
    'rgb(134,187,231)',
    'rgb(245,196,80)',
    'rgb(135,206,232)',
    'rgb(239,216,22)',
    'rgb(92,208,133)',
    'rgb(241,126,248)',
];
export const colorsAlpha = colors.map(transparency);

export const colorsDark = [
    'rgb(103,170,245)',
    'rgb(255,174,60)',
    'rgb(78,201,171)',
    'rgb(245,131,122)',
    'rgb(158,156,246)',
    'rgb(30,192,216)',
    'rgb(138,205,78)',
    'rgb(237,139,204)',
    'rgb(135,206,232)',
    'rgb(97,218,198)',
];

export const colorsDarkAlpha = colorsDark.map(transparency);

// export * from './axis.js';
// export * from './line.js';
// export * from './arc.js';
// export * from './pie.js';
// export * from './stack.js';
// export * from './rect.js';
