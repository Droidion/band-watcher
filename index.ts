import ChartHandler from './classes/ChartHandler';
import SocketHandler from './classes/SocketHandler';
import PulseIndicator from './classes/PulseIndicator';

const macs = ['01:02:03:01:04:01', '01:02:02:03:02:03'];

const socket = new SocketHandler('ws://realtime-api.mo.dbrain.io/ws', macs);
new ChartHandler(
  'leftChartX',
  socket,
  macs[0],
  {
    parentParam: 'accelerometer',
    childParam: 'x',
  },
  '#2c6ab5'
);
new ChartHandler(
  'leftChartY',
  socket,
  macs[0],
  {
    parentParam: 'accelerometer',
    childParam: 'y',
  },
  '#2c6ab5'
);
new ChartHandler(
  'leftChartZ',
  socket,
  macs[0],
  {
    parentParam: 'accelerometer',
    childParam: 'z',
  },
  '#2c6ab5'
);
new ChartHandler(
  'leftChartHeart',
  socket,
  macs[0],
  {
    parentParam: 'heart_rate',
    childParam: 'bpm',
  },
  '#b2485f'
);
new ChartHandler(
  'rightChartX',
  socket,
  macs[1],
  {
    parentParam: 'accelerometer',
    childParam: 'x',
  },
  '#2c6ab5'
);
new ChartHandler(
  'rightChartY',
  socket,
  macs[1],
  {
    parentParam: 'accelerometer',
    childParam: 'y',
  },
  '#2c6ab5'
);
new ChartHandler(
  'rightChartZ',
  socket,
  macs[1],
  {
    parentParam: 'accelerometer',
    childParam: 'z',
  },
  '#2c6ab5'
);
new ChartHandler(
  'rightChartHeart',
  socket,
  macs[1],
  {
    parentParam: 'heart_rate',
    childParam: 'bpm',
  },
  '#b2485f'
);

new PulseIndicator('leftPulseIndicator', socket, macs[0]);
new PulseIndicator('rightPulseIndicator', socket, macs[1);