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
      scales: {
        xAxes: [{ display: false }],
        yAxes: [{ display: false }],
      },
      animation: {
        duration: 0,
      },
      layout: {
        padding: {
          top: 50,
          bottom: 50,
        },
      },
      legend: {
        display: false,
      },
      elements: {
        line: {
          tension: 0, // disables bezier curves
        },
      },
    };
  }
  private getChartData(chartColor: string): object {
    return {
      labels: new Array(100),
      datasets: [
        {
          fill: false,
          borderColor: chartColor,
          borderWidth: 2,
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
      data: this.getChartData(chartColor),
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
    chartColor: string
  ) {
    this.mac = mac;
    this.elId = elId;
    this.el = document.getElementById(elId) as HTMLCanvasElement;
    this.socket = socket;
    this.generateChart(chartColor);
    setInterval(() => {
      this.updateFromData(mapParams);
    }, 5000);
  }
}
