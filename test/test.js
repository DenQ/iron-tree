var assert = require('assert');
var Node = require('../node');

const rootContent = {
  id: 1,
  name: 'Root',
}

describe('Node', function() {

  describe('Exist node and fileds', function() {

    it('Check children and content field', function() {
      const node = new Node(rootContent);
      assert.equal(0, node.children.length);
      assert.equal(rootContent.name, node.content.name);
      // assert.equal(rootContent.name, node.get('name'));
    });

  });

});
