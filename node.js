module.exports = class Node {

  constructor(content) {
    this.content = content;
    this.children = [];
  }

  get(fieldKey) {
    if (typeof this.content[fieldKey] !== 'undefined') {
      return this.content[fieldKey];
    }
  }

  add(child) {
    const node = new Node(child);
    this.children.push(node);
    return node;
  }

}
