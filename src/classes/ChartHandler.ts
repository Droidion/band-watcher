import Chart from 'chart.js';

import ConstructChartParams from '../interfaces/ConstructChartParams';
import getDefaultChartData from '../libs/getDefaultChartData';
import getDefaultChartOptions from '../libs/getDefaultChartOptions';
import SocketHandler from './SocketHandler';

export default class ChartHandler {
  private chartHandler: Chart;
  private el: HTMLCanvasElement;
  private mac: string;
  private readonly repeatMs: number = 5000;

  private updateFromData(dataCategory: string, dataParam: string): void {
    this.chartHandler.data.datasets[0].data = this.socket
      .getData()
      .filter(el => el.mac === this.mac && el[dataCategory])
      .map(el => el[dataCategory][dataParam])
      .slice(-100);
    this.chartHandler.update();
  }

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
    setInterval(() => {
      this.updateFromData(params.dataCategory, params.dataParam);
    }, this.repeatMs);
  }
}
