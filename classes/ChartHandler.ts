import Chart from 'chart.js';

import SocketHandler from './SocketHandler';

export default class ChartHandler {
  private elId: string;
  private el: HTMLCanvasElement;
  private chartHandler: Chart;
  private socket: SocketHandler;
  private mac: string;
  private getChartOptions(): object {
    return {
      elements: {
        line: {
          tension: 0, // disables bezier curves
        },
      },
    };
  }
  private getChartData(): object {
    return {
      labels: new Array(100),
      datasets: [
        {
          label: this.mac,
          data: [],
        },
      ],
    };
  }
  private updateFromData(): void {
    this.chartHandler.data.datasets[0].data = this.socket
      .getData()
      .filter(el => el.mac === this.mac)
      .map(el => el.accelerometer.y)
      .slice(0, 100);
    this.chartHandler.update();
  }
  private generateChart(): void {
    this.chartHandler = new Chart(this.el, {
      type: 'line',
      data: this.getChartData(),
      options: this.getChartOptions(),
    });
  }
  constructor(elId: string, socket: SocketHandler, mac: string) {
    this.mac = mac;
    this.elId = elId;
    this.el = document.getElementById(elId) as HTMLCanvasElement;
    this.socket = socket;
    this.generateChart();
    setInterval(() => {
      this.updateFromData();
    }, 1000);
  }
}
