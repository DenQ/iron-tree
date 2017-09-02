var Node = require('./node');

module.exports = class Tree {

  constructor(object = undefined) {
    this.rootNode = null;
    if (object) {
      this.rootNode = new Node(object);
    }
  }

  add(callback, object) {
    const type = typeof callback;
    if (type === 'string' && callback === 'root') {
      this.rootNode = new Node(object);
      return this;
    } else if (type === 'function') {

    }
  }

}
