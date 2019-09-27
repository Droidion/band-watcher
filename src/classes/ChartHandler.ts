import Chart from 'chart.js';

import ConstructChartParams from '../interfaces/ConstructChartParams';
import getDefaultChartData from '../libs/getDefaultChartData';
import getDefaultChartOptions from '../libs/getDefaultChartOptions';
import SocketHandler from './SocketHandler';

// All chart related things
export default class ChartHandler {
  // Chart.js handler
  private chartHandler: Chart;
  // HTML canvas element to render that chart in
  private el: HTMLCanvasElement;
  // MAC address of associated data displaying on this chart
  private mac: string;
  // Refresh rate in milliseconds
  private readonly repeatMs: number = 5000;

  // Update data for the chart from socket
  private updateFromData(dataCategory: string, dataParam: string): void {
    this.chartHandler.data.datasets[0].data = this.socket
      .getData()
      .filter(el => el.mac === this.mac && el[dataCategory]) // Filter only current MAC address and data type
      .map(el => el[dataCategory][dataParam])
      .slice(-100); // Showing last 100 cached measurements
    this.chartHandler.update();
  }

  // Generate new chart. Use during init
  private generateChart(chartColor: string): void {
    this.chartHandler = new Chart(this.el, {
      type: 'line',
      data: getDefaultChartData(chartColor),
      options: getDefaultChartOptions(),
    });
  }

  constructor(params: ConstructChartParams, private socket: SocketHandler) {
    this.mac = params.mac;
    this.el = document.getElementById(params.elId) as HTMLCanvasElement;
    this.generateChart(params.chartColor);
    // Rerender chart
    setInterval(() => {
      this.updateFromData(params.dataCategory, params.dataParam);
    }, this.repeatMs);
  }
}
