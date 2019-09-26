import DataMessage from '../interfaces/DataMessage';

export default class SocketHandler {
  private socket: WebSocket;
  private measurements: DataMessage[] = [];

  public getData(): DataMessage[] {
    return this.measurements;
  }

  private gotDataPackage(event: MessageEvent): void {
    const inputData = JSON.parse(event.data);
    if (this.measurements.length > 500) {
      this.measurements.shift();
    }
    if (this.macs.findIndex(el => el === inputData.mac) > -1) {
      this.measurements.push(inputData);
    }
  }

  constructor(serverUrl: string, private macs: string[] = []) {
    this.socket = new WebSocket(serverUrl);
    this.socket.onmessage = (event: MessageEvent) => {
      this.gotDataPackage(event);
    };
  }
}
