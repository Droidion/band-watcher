import ChartHandler from './classes/ChartHandler';
import SocketHandler from './classes/SocketHandler';

const macs = ['01:02:03:01:04:01', '01:02:02:03:02:03'];

const socket = new SocketHandler('ws://realtime-api.mo.dbrain.io/ws', macs);
new ChartHandler('leftChartX', socket, macs[0], {
  parentParam: 'accelerometer',
  childParam: 'x',
});
new ChartHandler('leftChartY', socket, macs[0], {
  parentParam: 'accelerometer',
  childParam: 'y',
});
new ChartHandler('leftChartZ', socket, macs[0], {
  parentParam: 'accelerometer',
  childParam: 'z',
});
new ChartHandler('leftChartHeart', socket, macs[0], {
  parentParam: 'heart_rate',
  childParam: 'bpm',
});
new ChartHandler('rightChartX', socket, macs[1], {
  parentParam: 'accelerometer',
  childParam: 'x',
});
new ChartHandler('rightChartY', socket, macs[1], {
  parentParam: 'accelerometer',
  childParam: 'y',
});
new ChartHandler('rightChartZ', socket, macs[1], {
  parentParam: 'accelerometer',
  childParam: 'z',
});
new ChartHandler('rightChartHeart', socket, macs[1], {
  parentParam: 'heart_rate',
  childParam: 'bpm',
});
