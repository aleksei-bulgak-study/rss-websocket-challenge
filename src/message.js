class Message {
  constructor(name) {
    this.name = name;
    this.message = null;
  }

  get authToken() {
    return this.token;
  }

  set authToken(token) {
    this.token = token;
  }

  toString() {
    return JSON.stringify(this);
  }

  parse(data) {
    console.log(data);                     // eslint-disable-line
    const parsed = JSON.parse(data);
    this.authToken = parsed['token']; // eslint-disable-line
  }
}

export default Message;
