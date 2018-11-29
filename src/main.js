import WebSocketApp from './websocket';

const url = 'ws://wsc.2123.io/';

const websocket = new WebSocketApp(url)

document.querySelector('button').addEventListener('click', (event) => {
  const name = document.querySelector('#username').value;
  if (name) {
    websocket.start(name);
  }
});

document.addEventListener('result', (event) => {
  document.querySelector('#result').value = event.detail;
  websocket.stop();
});


