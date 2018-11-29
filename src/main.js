import WebSocketApp from './websocket';

const url = 'ws://wsc.2123.io/';
const name = 'Aleksei Bulgak';

new WebSocketApp(url).start(name);
