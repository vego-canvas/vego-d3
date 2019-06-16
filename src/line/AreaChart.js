import LineChart from './LineChart';
import AreaModel from './AreaModel';
import AxisModel from './AxisModel';
import IndicatorModel from './IndicatorModel';

class AreaChart extends LineChart {
    _render(tickX, tickY, chosen) {
        const canvas = this.canvas;

        if (chosen) {
            this.series.ySeries = this.series.ySeries.map((i, idx) => chosen.includes(idx) ? i : null);
        }
        // eslint-disable-next-line
        const axis = AxisModel(tickX, tickY, this);
        canvas.addChild(axis);
        // eslint-disable-next-line
        const model = AreaModel(this);

        if (Array.isArray(model)) {
            model.forEach((m) => canvas.addChild(m));
        }
        // eslint-disable-next-line
        IndicatorModel(this);
    }
}
export default AreaChart;
