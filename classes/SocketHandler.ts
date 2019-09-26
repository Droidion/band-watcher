import DataMessage from '../interfaces/DataMessage';

export default class SocketHandler {
  private socket: WebSocket;
  static measurements: DataMessage[] = [];
  public getData(): DataMessage[] {
    return SocketHandler.measurements;
  }
  private gotDataPackage(event: MessageEvent): void {
    const inputData = JSON.parse(event.data);
    if (inputData.accelerometer) {
      if (SocketHandler.measurements.length > 300) {
        SocketHandler.measurements.shift();
      }
      SocketHandler.measurements.push(JSON.parse(event.data));
    }
  }
  constructor(serverUrl: string) {
    SocketHandler.measurements = [];
    this.socket = new WebSocket(serverUrl);
    this.socket.onmessage = this.gotDataPackage;
  }
}
