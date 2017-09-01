module.exports = class Node {

  constructor(content) {
    this.content = content;
    this.children = [];
    this.length = 0;
  }

  get(fieldKey) {
    if (typeof this.content[fieldKey] !== 'undefined') {
      return this.content[fieldKey];
    }
  }

  add(child) {
    const node = new Node(child);
    this.length++;
    this.children.push(node);
    return node;
  }

  remove(callback) {
    const index = this.children.findIndex(callback);
    if (index > 0) {
      const removeItems = this.children.splice(index, 1);
      this.length--;
      return removeItems;
    } return [];
  }

}
