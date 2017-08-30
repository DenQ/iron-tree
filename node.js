module.exports = class Node {

  constructor(content) {
    this.content = content;
    this.children = [];
  }

  get(fieldKey) {
    return this.content[fieldKey];
  }

}
