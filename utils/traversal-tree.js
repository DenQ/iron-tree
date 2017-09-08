module.exports = function traversalTree(tree, node = null, criteria, callback) {
  const currentNode = node || tree.rootNode;
  if (!node) {
    if (typeof criteria === 'function' && criteria(currentNode)) {
      callback(currentNode);
    } else if (criteria === null) {
      callback(currentNode);
    }
  }
  currentNode.traversal(criteria, callback);
  const children = currentNode.children;

  children.forEach((item) => {
    traversalTree(tree, item, criteria, callback);
  });
}
