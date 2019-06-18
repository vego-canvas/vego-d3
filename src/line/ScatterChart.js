import LineChart from './LineChart';
import ScatterModel from './ScatterModel';
import AxisModel from './AxisModel';
import IndicatorModel from './IndicatorModel';

class ScatterChart extends LineChart {
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
        const model = ScatterModel(this);

        if (Array.isArray(model)) {
            model.forEach((m) => canvas.addChild(m));
        }
        // eslint-disable-next-line
        IndicatorModel(this);
    }
}
export default ScatterChart;
