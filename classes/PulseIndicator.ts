import SocketHandler from './SocketHandler';

export default class PulseIndicator {
  private value: number = 0;
  private el: HTMLElement;
  public renderValue(): void {
    this.el.innerText = Math.round(this.value).toString();
  }
  public setValue(value: number): void {
    this.value = value;
  }
  constructor(elId: string, socket: SocketHandler, mac: string) {
    this.el = document.getElementById(elId);
    setInterval(() => {
      this.setValue(
        socket
          .getData()
          .filter(el => el.mac === mac && el['heart_rate'])
          .map(el => el['heart_rate']['bpm'])
          .slice(-1)
          .pop()
      );
      this.renderValue();
    }, 1000);
  }
}
