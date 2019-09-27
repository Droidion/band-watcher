import SocketHandler from './SocketHandler';

// Display heart rate value
export default class PulseIndicator {
  private el: HTMLElement;
  // Refresh rate on the page in milliseconds
  private readonly repeatMs: number = 5000;
  // Heart rate value
  private value: number = 0;

  // Perform render on a page
  private renderValue(): void {
    this.el.innerText = Math.round(this.value).toString();
  }

  // Cache heart rate value. Intended to be got from cached measurments from socket messages
  private setValue(value: number): void {
    this.value = value;
  }

  constructor(elId: string, socket: SocketHandler, mac: string) {
    this.el = document.getElementById(elId);
    // Initiate rerender
    setInterval(() => {
      // Get current data from cached measurments
      this.setValue(
        socket
          .getData()
          .filter(el => el.mac === mac && el['heart_rate']) // Get only heart rate with a specific mac address
          .map(el => el['heart_rate']['bpm'])
          .pop()
      );
      this.renderValue();
    }, this.repeatMs);
  }
}
