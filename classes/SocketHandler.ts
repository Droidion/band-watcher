import DataMessage from '../interfaces/DataMessage';

export default class SocketHandler {
  private socket: WebSocket;
  static measurements: DataMessage[] = [];
  static macs: string[];
  public getData(): DataMessage[] {
    return SocketHandler.measurements;
  }
  private gotDataPackage(event: MessageEvent): void {
    const inputData = JSON.parse(event.data);
    console.log(inputData);
    if (SocketHandler.measurements.length > 10000) {
      SocketHandler.measurements.shift();
    }
    if (SocketHandler.macs.findIndex(el => el === inputData.mac) > -1)
      SocketHandler.measurements.push(inputData);
  }
  constructor(serverUrl: string, macs: string[]) {
    SocketHandler.macs = macs;
    SocketHandler.measurements = [];
    this.socket = new WebSocket(serverUrl);
    this.socket.onmessage = this.gotDataPackage;
  }
}
