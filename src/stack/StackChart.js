import {
    scaleBand,
    scaleLinear,
} from 'd3-scale';

import { max, min } from 'd3-array';

import Chart from '../Chart';
import {
    scaleBandInvert,
    checkOption,
    checkSeries,
} from './utils';
import DataLayer from './DataLayer';
import AxisModel from './AxisModel';
import StackModel from './StackModel';
import IndicatorModel from './IndicatorModel';

class StackChart extends Chart {
    constructor(el, options) {
        super(el, options);

        const opt = checkOption(options);
        this.series = checkSeries(opt, DataLayer);
        this.yaxis = opt.yAxis || {};
        this.xaxis = opt.xAxis || {};
        this.tickFormatFunc = opt.tickFormatFunc;
        // eslint-disable-next-line
        this.onIndicatorChange = opt.onIndicatorChange || (() => {});
        this._calcuScaler();
    }

    _calcuScaler() {
        let {
            minY, maxY,
        } = this.yaxis;
        const {
            width, height,
        } = this.bounds;
        const {
            left, top, right, bottom,
        } = this.padding;
        const {
            xSeries, ySeries,
        } = this.series;
        const scalerX = this.scalerX = scaleBand()
            .domain(xSeries)
            .rangeRound([left, width - right])
            .paddingInner(0)
            .paddingOuter(0);

        minY = minY || min(ySeries, (d) => min(d, (d) => Array.isArray(d) ? d[d.length - 1] : d));
        maxY = maxY || max(ySeries, (d) => max(d, (d) => Array.isArray(d) ? d[d.length - 1] : d));
        const scalerY = this.scalerY = scaleLinear()
            .range([height - bottom, top])
            .domain([minY, maxY]) // ySeries的排布方式值和这个有关
            .nice(8);
        this.scalerXInvert = scaleBandInvert(scalerX);
        this.scalerYInvert = scalerY.invert;
    }

    _render(tickX, tickY, chosen) {
        const canvas = this.canvas;

        if (chosen) {
            this.series.ySeries = this.series.ySeries.map((i, idx) => chosen.includes(idx) ? i : null);
        }
        // eslint-disable-next-line
        const axis = AxisModel(
            tickX || this.xaxis.count || 12,
            tickY || this.yaxis.count || 8, this
        );
        canvas.addChild(axis);
        // eslint-disable-next-line
        const model = StackModel(this);
        if (Array.isArray(model)) {
            model.forEach((m) => canvas.addChild(m));
        }
        // eslint-disable-next-line
        IndicatorModel(this, model);
    }
}
export default StackChart;
