import Message from './message';

class WebSocketApp {
  constructor(url) {
    this.step = 0;
    this.connected = false;

    this.url = url;
    this.websocket = new WebSocket(this.url);
    this.websocket.binaryType = 'arraybuffer';
    this.websocket.onmessage = event => this._processIncome(event);
    this.websocket.onopen = () => this._ready();
  }

  start(name) {
    this.message = new Message(name);

    if (this.connected) {
      this.websocket.send(JSON.stringify({ name, command: 'challenge accepted' }));
    } else {
      console.log('Loading');
      setTimeout(() => this.start(name), 5000);
    }
  }

  stop() {
    if (this.websocket.readyState !== this.websocket.CLOSED) {
      this.websocket.close();
    }
  }

  _ready() {
    this.connected = true;
  }

  _send(result) {
    this.websocket.send(
      JSON.stringify({
        "token": this.message.authToken,
        "command": this.message.command,
        "answer": result
      })
    );
  }

  _processIncome(event) {
    if (typeof event.data === 'string') {
      this._processTextData(JSON.parse(event.data));
    } else if (typeof event.data === 'object') {
      this._processBinaryData(event.data);
    } else {
      console.log('Message data format!');
    }
  }

  _processTextData(data) {
    if (data['token']) {
      this.message.authToken = data['token'];
    }
    if (data['next']) {
      this.message.command = data['next'];
      this._send();
    }

    if (data['name'] === 'arithmetic') {
      this._performArithmetic(data['task']);
    }

    if (data['name'] === 'function_evaluation') {
      this._send(eval(data['task'].fn)());
    }

    if (data['name'] === 'binary_arithmetic') {
      this.message.bit = data['task'].bits;
    }

    if (data['name'] === 'win') {
      this._send();
    }

    if (data['secretCode']) {
      console.log(`WIN: ${data['secretCode']}`);
      this.websocket.close();
      document.dispatchEvent(new CustomEvent("result", { detail: data['secretCode'] }));
    }

    if (data['error']) {
      document.dispatchEvent(new CustomEvent("error", { detail: JSON.stringify(data) }));
    }
  }

  _performArithmetic(data) {
    const sign = data['sign'];
    const result = data['values'].reduce((acc, val) => eval(`${acc} ${sign} ${val}`));
    this._send(result);
  }

  _processBinaryData(buffer) {
    let ul = eval(`new Uint${this.message.bit}Array(${buffer})`);
    const result = ul.reduce((acc, val) => acc + val);
    this._send(result);
  }
}

export default WebSocketApp;
