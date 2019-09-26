import ChartHandler from './classes/ChartHandler';
import SocketHandler from './classes/SocketHandler';

const socket = new SocketHandler('ws://realtime-api.moesk.dbrain.io/ws');
new ChartHandler('leftChart', socket, 'B0:6F:E0:73:A9:64');
new ChartHandler('rightChart', socket, 'B0:6F:E0:15:9F:AE');
