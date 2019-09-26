import DataMessage from '../interfaces/DataMessage';

export default class SocketHandler {
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
