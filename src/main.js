import WebSocketApp from './websocket';

const url = 'ws://wsc.2123.io/';

let websocket = null;

document.querySelector('button').addEventListener('click', (event) => {
  const name = document.querySelector('#username').value;
  document.querySelector('#error').innerHTML = '';
  if (name) {
    websocket = new WebSocketApp(url);
    websocket.start(name);
  }
});

document.addEventListener('result', (event) => {
  document.querySelector('#result').value = event.detail;
  websocket.stop();
});

document.addEventListener('error', (event) => {
  document.querySelector('#error').innerHTML = event.detail;
  websocket.stop();
});



