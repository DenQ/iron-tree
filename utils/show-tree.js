module.exports = function showTree(tree, node = null, level = 1) {
  node = node || tree.rootNode;
  console.log((new Array(level)).join('\t'), node.content);
  node.children.forEach((item) => {
    showTree(tree, item, level + 1);
  });
}
