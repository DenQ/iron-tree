module.exports = function searchNode(tree, node, criteria, options) {
  const currentNode = node || tree.rootNode;
  if (criteria(currentNode)) {
    return currentNode;
  }
  const children = currentNode.children
  let target = null;
  for(let i=0; i<children.length; i++) {
    const item = children[i];
    target = searchNode(tree, item, criteria);
    if (target) {
      return target;
    }
  }
}
