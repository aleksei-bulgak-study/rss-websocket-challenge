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
}

export default Message;
