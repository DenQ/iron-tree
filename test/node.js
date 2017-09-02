 chai = require('chai')
  , assert = chai.assert
  , expect = chai.expect
  , should = chai.should();

var Node = require('../src/node');

const rootContent = {
  id: 1,
  name: 'Root',
}
let node = new Node(rootContent);

describe('Node', function() {
  beforeEach(function() {
    node = new Node(rootContent);
  });

  describe('Constructor', function() {

    it('Check children and content field', function() {
      const { children, content } = node;

      assert.isArray(children);
      expect(children).to.have.lengthOf(0);
      expect(content.name).to.equal(rootContent.name);
    });

    it('Check correct work getter', function() {
      assert.equal(rootContent.name, node.get('name'));
      expect(node.get('lastname')).to.equal(undefined);
    });

  });


  describe('Add', function() {

    it('Add one node', function() {
      const childNode = node.add({ id: 2, name: 'Two node'});

      expect(childNode instanceof Node).to.equal(true);
      expect(node.children).to.have.lengthOf(1);
      expect(node.length).to.equal(1);
    });

    it('Add nodes', function() {
      node.add({ id: 2, name: 'Two node'});
      node.add({ id: 3, name: 'Three node'});

      expect(node.children).to.have.lengthOf(2);
      expect(node.length).to.equal(2);
    });

  });


  describe('Remove', function() {

    it('Remove exists child node', function() {
      node.add({ id: 2, name: 'Two node'});
      node.add({ id: 3, name: 'Three node'});
      const removedNodes = node.remove((itemNode) => {
        return itemNode.get('id') === 3;
      });

      expect(node.length).to.equal(1);
      expect(removedNodes.length).to.equal(1);
    });

    it('Remove not exists node', function() {
      node.add({ id: 2, name: 'Two node'});
      node.add({ id: 3, name: 'Three node'});
      const removedNodes = node.remove((itemNode) => {
        return itemNode.get('id') === 333;
      });

      expect(node.length).to.equal(2);
      expect(removedNodes.length).to.equal(0);
    });

  });

});
