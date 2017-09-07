// for json tree
module.exports = function removeEmptyChildren(jTree, node = null, options) {
  const { key_children } = options;
  node = node || jTree[0];
  if (node[key_children].length === 0) {
    delete node[key_children];
  } else {
    node[key_children].forEach((item) => {
      removeEmptyChildren(jTree, item, options);
    });
  }
}
