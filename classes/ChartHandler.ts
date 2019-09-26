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
          fill: false,
          backgroundColor: '#41608c',
          borderColor: '#41608c',
          pointRadius: 0,
          label: this.mac,
          data: [],
        },
      ],
    };
  }
  private updateFromData(mapParams: {
    parentParam: string;
    childParam: string;
  }): void {
    console.log(
      this.socket
        .getData()
        .filter(el => el.mac === this.mac && el[mapParams.parentParam]),
    );
    this.chartHandler.data.datasets[0].data = this.socket
      .getData()
      .filter(el => el.mac === this.mac && el[mapParams.parentParam])
      .map(el => el[mapParams.parentParam][mapParams.childParam])
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
  constructor(
    elId: string,
    socket: SocketHandler,
    mac: string,
    mapParams: {
      parentParam: string;
      childParam: string;
    },
  ) {
    this.mac = mac;
    this.elId = elId;
    this.el = document.getElementById(elId) as HTMLCanvasElement;
    this.socket = socket;
    this.generateChart();
    setInterval(() => {
      this.updateFromData(mapParams);
    }, 5000);
  }
}
