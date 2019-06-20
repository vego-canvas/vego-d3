import {
    VegoCanvas,
} from 'vegocore';
import {
    extractElBounding,
    checkElement,
    DEFAULT_PADDING,
} from './util';
import { colorsDarkGenerator } from './common/colors-cloudui';
const DEFAULT_FONT = '12px Helvetica Neue,Helvetica,Tahoma,Arial,Microsoft YaHei,PingFang SC,Hiragino Sans GB,WenQuanYi Micro Hei,sans-serif';
const DEFAULT_STYLE = {
    // X轴
    xfontColor: '#565b61',
    xAxisFont: DEFAULT_FONT,
    xFontMarginTop: 10,
    xAxisEdgeColor: '#ccc',

    // Y轴
    yfontColor: '#565b61',
    yAxisFont: DEFAULT_FONT,
    yFontMarginRight: 20,
    yAxisEdgeColor: '#ccc',

    gridColor: '#eee',
};
class Chart {
    constructor(el, options) {
        this.el = checkElement(el);
        this.bounds = extractElBounding(this.el);
        this.padding = Object.assign({}, DEFAULT_PADDING, options.padding);
        this.prepareCanvas();
        this.injectColorList(colorsDarkGenerator());
        this.injectColorStyle();
    }

    injectColorList(colors) {
        this.colors = colors.map((c) => c(this.canvas.ctx));
    }

    injectColorStyle(style) {
        this.styles = Object.assign({}, style, DEFAULT_STYLE);
    }

    _calcuScaler() {
        throw new Error('_calcuScaler need be implement!');
    }

    prepareCanvas() {
        const {
            width, height,
        } = this.bounds;
        if (this.canvas) {
            this.canvas.canvas.remove();
            this.canvas = null;
        }
        this.el.innerHTML = '';
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

    reRender(obj) {
        this.prepareCanvas();
        this.render(obj);
    }

    resize(obj) {
        this.bounds = extractElBounding(this.el);
        this.prepareCanvas();
        this._calcuScaler();
        this.render(obj);
    }
}

export default Chart;
