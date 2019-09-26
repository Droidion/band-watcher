import Chart from 'chart.js';

interface DataMessage {
  mac: string;
  accelerometer: {
    timestamp: number;
    nano: number;
    x: number;
    y: number;
    z: number;
  };
}

class SocketHandler {
  private socket: WebSocket;
  private data: DataMessage[] = [];
  public getData(): DataMessage[] {
    return this.data;
  }
  private gotDataPackage(event: MessageEvent): void {
    console.log('sss');
    if (this.data.length > 1000) {
      this.data.shift();
    }
    this.data.push(event.data);
  }
  constructor(serverUrl: string) {
    this.socket = new WebSocket(serverUrl);
    this.socket.onmessage = this.gotDataPackage;
  }
}

class ChartHandler {
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
          label: 'Test',
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

const socket = new SocketHandler('wss://realtime-api.m.dbrain.io/ws');
new ChartHandler('leftChart', socket, 'B0:6F:E0:73:A9:64');
new ChartHandler('rightChart', socket, 'B0:6F:E0:15:9F:AE');
