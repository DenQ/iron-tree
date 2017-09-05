module.exports = function serializeTree(tree, node = null, target = [], options) {
  const { key_children } = options;
  node = node || tree.rootNode;
  const index = target.push(
    Object.assign({ [key_children]: []}, node.content)
  );
  node.children.forEach((item) => {
    serializeTree(tree, item, target[index-1][key_children], options);
  });
  return target;
}
