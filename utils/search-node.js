module.exports = function searchNode(tree, node, criteria, options) {
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
