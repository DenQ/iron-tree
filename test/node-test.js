const Node = require('../dist/index').Node;
const compareById = require('../utils/node-compare-by-id');
const chai = require('chai')
  , assert = chai.assert
  , expect = chai.expect
  , should = chai.should();


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


  describe('Get', function() {

    it('Method get with correct path', function() {
      expect(node.get('id')).to.equal(1);
      expect(node.get('name')).to.equal('Root');
    });

    it('Method get with incorrect path', function() {
      expect(node.get('uid')).to.equal(undefined);
    });

  });

  describe('Set', function() {

    it('Method set with correct path', function() {
      expect(node.set('id', 100)).to.equal(true);
      expect(node.get('id')).to.equal(100);
    });

    it('Method set with incorrect path', function() {
      expect(node.set('uid', 101)).to.equal(true);
      expect(node.get('uid')).to.equal(101);
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


  describe('Sort', function() {

    it('Order desc', function() {
      node.add({ id: 2, name: 'Two node'});
      node.add({ id: 3, name: 'Three node'});
      node.add({ id: 15, name: 'Fifteen node'});
      node.add({ id: 4, name: 'Four node'});
      node.sort(compareById(false));

      expect(node.children[0].get('id')).to.equal(15);
      expect(node.children[1].get('id')).to.equal(4);
      expect(node.children[2].get('id')).to.equal(3);
      expect(node.children[3].get('id')).to.equal(2);
    });

    it('Order asc', function() {
      node.add({ id: 2, name: 'Two node'});
      node.add({ id: 3, name: 'Three node'});
      node.add({ id: 15, name: 'Fifteen node'});
      node.add({ id: 4, name: 'Four node'});
      node.sort(compareById(true));

      expect(node.children[0].get('id')).to.equal(2);
      expect(node.children[1].get('id')).to.equal(3);
      expect(node.children[2].get('id')).to.equal(4);
      expect(node.children[3].get('id')).to.equal(15);
    });

  });


  describe('Traversal', function() {

    it('Change name for each child', function() {
      node.add({ id: 2, name: 'Two node'});
      node.add({ id: 3, name: 'Three node'});
      node.add({ id: 15, name: 'Fifteen node'});
      node.add({ id: 4, name: 'Four node'});
      node.traversal(null, (currentNode) => {
        const name = currentNode.get('name');
        currentNode.set('name', `${name}!`);
      });
      expect(node.children[0].get('name')).to.equal('Two node!');
      expect(node.children[1].get('name')).to.equal('Three node!');
    });

    it('Change name for item with id is 3', function() {
      node.add({ id: 2, name: 'Two node'});
      node.add({ id: 3, name: 'Three node'});
      node.add({ id: 15, name: 'Fifteen node'});
      node.add({ id: 4, name: 'Four node'});
      node.traversal((currentNode) => currentNode.get('id') === 3, (currentNode) => {
        const name = currentNode.get('name');
        currentNode.set('name', `${name}!`);
      });
      expect(node.children[0].get('name')).to.equal('Two node');
      expect(node.children[1].get('name')).to.equal('Three node!');
    });

  });

});
