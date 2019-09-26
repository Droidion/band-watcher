export default interface DataMessage {
  mac: string;
  accelerometer: {
    timestamp: number;
    nano: number;
    x: number;
    y: number;
    z: number;
  };
}
