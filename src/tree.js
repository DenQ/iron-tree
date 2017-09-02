var Node = require('./node');

function searchNode(tree, node, criteria, options) {
  const currentNode = node || tree.rootNode;
  if (criteria(currentNode)) {
    return currentNode;
  }
  const children = currentNode.children
  for(var i=0; i<children.length; i++) {
    const item = children[i];
    if (criteria(item)) {
      return item;
    } else {
      return searchNode(tree, item, criteria);
    }
  }
}

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
      if (target.add(object)) {
        return this;
      }
    }
  }

}
