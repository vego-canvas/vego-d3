export function isElement(obj) {
    try {
        return obj instanceof HTMLElement;
    } catch (e) {
        return (typeof obj === 'object')
        && (obj.nodeType === 1) && (typeof obj.style === 'object')
        && (typeof obj.ownerDocument === 'object');
    }
}
export function checkElement(el) {
    if (el && isElement(el)) {
        return el;
    }
    throw new Error('el is not a document node');
}
export const DEFAULT_PADDING = {
    left: 50,
    right: 20,
    top: 20,
    bottom: 30,
};
export function extractElBounding(el) {
    return el.getBoundingClientRect();
}
