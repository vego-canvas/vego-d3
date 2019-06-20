import { LineChart, AreaChart, ScatterChart } from './line/index';
import StackChart from './stack/StackChart';
import Chart from './Chart';
import { colorsDarkGenerator } from './common/colors-cloudui';
const colorsDark = colorsDarkGenerator().map((c) => c());
export {
    Chart, colorsDark,
    LineChart, AreaChart, ScatterChart,
    StackChart,
};
