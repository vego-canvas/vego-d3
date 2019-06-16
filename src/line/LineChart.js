import {
    scalePoint,
    scaleLinear,
} from 'd3-scale';
import Chart from '../Chart';
import {
    scaleBandInvert,
    checkOption,
    checkSeries,
} from './utils';

import { max } from 'd3-array';

import LineModel from './LineModel';
import AxisModel from './AxisModel';
import IndicatorModel from './IndicatorModel';
import DataLayer from './DataLayer';

class LineChart extends Chart {
    constructor(el, options) {
        super(el, options);

        const opt = checkOption(options);
        this.series = checkSeries(opt, DataLayer);
        this._calcuScaler();
    }

    _calcuScaler() {
        const {
            width, height,
        } = this.bounds;
        const {
            left, top, right, bottom,
        } = this.padding;
        const {
            xSeries, ySeries,
        } = this.series;

        const scalerX = this.scalerX = scalePoint()
            .range([left, width - right])
            .domain(xSeries);

        const scalerY = this.scalerY = scaleLinear()
            .range([height - bottom, top])
            .domain([0, max(ySeries, (d) => max(d, (d) => Array.isArray(d) ? d[d.length - 1] : d))]) // ySeries的排布方式值和这个有关
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
        const axis = AxisModel(tickX, tickY, this);
        canvas.addChild(axis);
        // eslint-disable-next-line
        const model = LineModel(this);

        if (Array.isArray(model)) {
            model.forEach((m) => canvas.addChild(m));
        }
        // eslint-disable-next-line
        IndicatorModel(this);
    }
}

export default LineChart;
