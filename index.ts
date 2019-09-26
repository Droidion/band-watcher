import ChartHandler from './classes/ChartHandler';
import PulseIndicator from './classes/PulseIndicator';
import SocketHandler from './classes/SocketHandler';

const chartColors = ['#2c6ab5', '#b2485f'];
const macs = ['01:02:03:01:04:01', '01:02:02:03:02:03'];
const socketAddress = 'ws://realtime-api.mo.dbrain.io/ws';

const socket = new SocketHandler(socketAddress, macs);

new ChartHandler(
  {
    elId: 'leftChartX',
    mac: macs[0],
    chartColor: chartColors[0],
    dataCategory: 'accelerometer',
    dataParam: 'x',
  },
  socket
);

new ChartHandler(
  {
    elId: 'leftChartY',
    mac: macs[0],
    chartColor: chartColors[0],
    dataCategory: 'accelerometer',
    dataParam: 'y',
  },
  socket
);

new ChartHandler(
  {
    elId: 'leftChartZ',
    mac: macs[0],
    chartColor: chartColors[0],
    dataCategory: 'accelerometer',
    dataParam: 'z',
  },
  socket
);

new ChartHandler(
  {
    elId: 'leftChartHeart',
    mac: macs[0],
    chartColor: chartColors[1],
    dataCategory: 'heart_rate',
    dataParam: 'bpm',
  },
  socket
);

new ChartHandler(
  {
    elId: 'rightChartX',
    mac: macs[1],
    chartColor: chartColors[0],
    dataCategory: 'accelerometer',
    dataParam: 'x',
  },
  socket
);

new ChartHandler(
  {
    elId: 'rightChartY',
    mac: macs[1],
    chartColor: chartColors[0],
    dataCategory: 'accelerometer',
    dataParam: 'y',
  },
  socket
);

new ChartHandler(
  {
    elId: 'rightChartZ',
    mac: macs[1],
    chartColor: chartColors[0],
    dataCategory: 'accelerometer',
    dataParam: 'z',
  },
  socket
);

new ChartHandler(
  {
    elId: 'rightChartHeart',
    mac: macs[1],
    chartColor: chartColors[1],
    dataCategory: 'heart_rate',
    dataParam: 'bpm',
  },
  socket
);

new PulseIndicator('leftPulseIndicator', socket, macs[0]);
new PulseIndicator('rightPulseIndicator', socket, macs[1]);
