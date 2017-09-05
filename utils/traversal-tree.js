module.exports = function traversalTree(tree, node = null, criteria, callback) {
  const currentNode = node || tree.rootNode;
  if (!node) {
    callback(currentNode)
  }
  currentNode.traversal(criteria, callback);
  const children = currentNode.children;

  children.forEach((item) => {
    traversalTree(tree, item, criteria, callback);
  });
}
