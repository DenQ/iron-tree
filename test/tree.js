const Node = require('../src/node');
const Tree = require('../src/tree');
const showTree = require('../utils/show-tree');
const compareById = require('../utils/node-compare-by-id');
const generateTreeDefault = require('../fakes/generate-tree-default');

let chai = require('chai')
  , assert = chai.assert
  , expect = chai.expect
  , should = chai.should();

let object = {id: 1, title: 'Root'};
let tree = new Tree(object);

describe('Tree', function() {
  beforeEach(function() {
    object = { id: 1, title: 'Root' };
    tree = new Tree(object);
  });

  describe('Constructor', function() {

    it('It exists', function() {
      expect(tree instanceof Tree).to.equal(true);
    });

    it('With params', function() {
      expect(tree.rootNode instanceof Node).to.equal(true);
    });

    it('Without params', function() {
      const tree = new Tree();

      expect(tree.rootNode instanceof Node).to.equal(false);
      expect(tree.rootNode).to.equal(null);
    });

  });


  describe('Add', function() {

    it('Add root', function() {
      const tree = new Tree();
      const resultTree = tree.add('root', object);

      expect(resultTree instanceof Tree).to.equal(true);
      expect(resultTree.rootNode instanceof Node).to.equal(true);
    });

    it('Add regular node', function() {
      const regularObject = { id:2, title: 'Node 2'}
      const resultTree = tree.add((parentNode) => {
        return parentNode.get('id') === 1;
      }, regularObject);

      expect(resultTree instanceof Tree).to.equal(true);
      expect(resultTree.rootNode instanceof Node).to.equal(true);

      expect(resultTree.rootNode.children).to.have.lengthOf(1);
      expect(resultTree.rootNode.children[0].get('id')).to.equal(2);
    });

    it('Add many nodes', function() {
      tree = generateTreeDefault();

      expect(tree instanceof Tree).to.equal(true);
      expect(tree.rootNode instanceof Node).to.equal(true);

      expect(tree.rootNode.get('id')).to.equal(1);
      expect(tree.rootNode.children[0].get('id')).to.equal(2);
      expect(tree.rootNode.children[1].get('id')).to.equal(3);

      expect(tree.rootNode.children[1].children[0].get('id')).to.equal(4);
      expect(tree.rootNode.children[1].children[0].children[0].get('id')).to.equal(5);
      expect(tree.rootNode.children[1].children[0].children[0].children[0].get('id')).to.equal(6);

      // showTree(tree);
    });
  });


  describe('Contains', function() {

    it('Search element when he does exists', function() {
      tree = generateTreeDefault();
      const targetNode = tree.contains((currentNode) => {
        return currentNode.get('id') === 7;
      });

      expect(targetNode instanceof Node).to.equal(true);
      expect(targetNode.get('id')).to.equal(7);
    });

    it('Search element when he does not exists', function() {
      tree = generateTreeDefault();
      const targetNode = tree.contains((currentNode) => {
        return currentNode.get('id') === 100;
      });

      expect(targetNode).to.equal(undefined);
    });

  });


  describe('Remove', function() {

    it('Remove correct criteria', function() {
      tree = generateTreeDefault();
      const result = tree.remove((currentNode) => {
        return currentNode.get('id') === 7;
      });
      const targetNode = tree.contains((currentNode) => {
        return currentNode.get('id') === 7;
      });

      expect(result).to.equal(true);
      expect(targetNode).to.equal(undefined);
    });

    it('Remove incorrect criteria', function() {
      tree = generateTreeDefault();
      const result = tree.remove((currentNode) => {
        return currentNode.get('id') === 100;
      });
      const targetNode = tree.contains((currentNode) => {
        return currentNode.get('id') === 100;
      });

      expect(result).to.equal(false);
      expect(targetNode).to.equal(undefined);
    });

  });


  describe('Move', function() {

    it('Move exists branch', function() {
      tree = generateTreeDefault();
      const search = (currentNode) => currentNode.get('id') === 7;
      const destination = (currentNode) => currentNode.get('id') === 3;
      const result = tree.move(search, destination);
      const targetNode = tree.contains(search);

      expect(result).to.equal(true);
      expect(targetNode.get('id')).to.equal(7);
      expect(targetNode.parent.get('id')).to.equal(3);

      // showTree(tree);
    });

    it('Move not exists branch', function() {
      tree = generateTreeDefault();
      const search = (currentNode) => currentNode.get('id') === 100
      const destination = (currentNode) => currentNode.get('id') === 3;
      const result = tree.move(search, destination);
      const targetNode = tree.contains(search);

      expect(result).to.equal(false);
      expect(targetNode).to.equal(undefined);

      // showTree(tree);
    });
  });


//   describe('Sort', function() {
//
//     it('Order desc', function() {
//       tree = generateTreeDefault();
//       tree.sort(compareById(false));
//
//       showTree(tree);
//     });
//
//   });
//
});

// function traversal(tree, node = null, callback) {
//   const currentNode = node || tree.rootNode;
//   const children = currentNode.children;
//   children.sort(compareById(false));
//
//   for(let i=0; i<children.length; i++) {
//     const item = children[i];
//     traversal(tree, item, callback);
//   }
// }
