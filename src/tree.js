let Node = require('./node');
const searchNode = require('../utils/search-node');

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
      const target = searchNode(this, null, callback);
      if (target && target.add(object)) {
        return this;
      } else {
        console.log('Warning', object);
      }
    }
  }

  contains(criteria) {
    return searchNode(this, null, criteria);
  }

  remove(criteria) {
    const targetNode = this.contains(criteria);
    if (targetNode) {
      return !!targetNode.parent.remove(criteria);
    }
    return false;
  }

  move(search, destination) {
    const targetNode = this.contains(search);
    if (targetNode && this.remove(search)) {
      const destinationNode = this.contains(destination);
      return !!destinationNode.add(targetNode);
    }
    return false;
  }

  sort(compare) {

  }

}
