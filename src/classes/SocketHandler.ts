import DataMessage from '../interfaces/DataMessage';

// All socket related stuff
export default class SocketHandler {
  private socket: WebSocket;
  // Cache for measurements filtered from socket messages
  private measurements: DataMessage[] = [];

  // Get current cached messages
  public getData(): DataMessage[] {
    return this.measurements;
  }

  // Filter which messages to cache
  private gotDataPackage(event: MessageEvent): void {
    const inputData = JSON.parse(event.data);
    // Caching up to 500 measurments
    if (this.measurements.length > 500) {
      this.measurements.shift();
    }
    // Caching only measurments for hardcoded mac addresses
    if (this.macs.findIndex(el => el === inputData.mac) > -1) {
      this.measurements.push(inputData);
    }
  }

  constructor(serverUrl: string, private macs: string[] = []) {
    this.socket = new WebSocket(serverUrl);
    // Getting messages from the socket
    this.socket.onmessage = (event: MessageEvent) => {
      this.gotDataPackage(event);
    };
  }
}
