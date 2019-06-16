import {
    VegoCanvas,
} from 'vegocore';
import {
    extractElBounding,
    checkElement,
    DEFAULT_PADDING,
} from './util';

class Chart {
    constructor(el, options) {
        this.el = checkElement(el);
        this.bounds = extractElBounding(this.el);
        this.padding = Object.assign({}, DEFAULT_PADDING, options.padding);
        this.prepareCanvas();
    }

    _calcuScaler() {
        throw new Error('_calcuScaler need be implement!');
    }

    prepareCanvas() {
        const {
            width, height,
        } = this.bounds;
        const canvasEle = document.createElement('canvas');
        canvasEle.width = width;
        canvasEle.height = height;
        this.el.appendChild(canvasEle);
        this.canvas = new VegoCanvas(canvasEle, {
            enableMouseOver: 16,
            disableCanvasmove: true,
        });
    }

    _render() {
        throw new Error('_render need be implement!');
    }

    render({ tickX, tickY, chosen }) {
        const { canvas } = this;
        this._render(tickX, tickY, chosen);
        canvas.render();
    }
}

export default Chart;
