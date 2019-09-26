import Chart from 'chart.js';

import getDefaultChartData from '../libs/getDefaultChartData';
import getDefaultChartOptions from '../libs/getDefaultChartOptions';
import SocketHandler from './SocketHandler';

export default class ChartHandler {
  private el: HTMLCanvasElement;
  private chartHandler: Chart;
  private updateFromData(mapParams: {
    parentParam: string;
    childParam: string;
  }): void {
    this.chartHandler.data.datasets[0].data = this.socket
      .getData()
      .filter(el => el.mac === this.mac && el[mapParams.parentParam])
      .map(el => el[mapParams.parentParam][mapParams.childParam])
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
  constructor(
    elId: string,
    private socket: SocketHandler,
    private mac: string,
    mapParams: {
      parentParam: string;
      childParam: string;
    },
    chartColor: string
  ) {
    this.el = document.getElementById(elId) as HTMLCanvasElement;
    this.generateChart(chartColor);
    setInterval(() => {
      this.updateFromData(mapParams);
    }, 5000);
  }
}
