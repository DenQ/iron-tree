let Node = require('../src/node');
let Tree = require('../src/tree');

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
      const list = [
        { id: 2, parent: 1 },
        { id: 3, parent: 1 },
        { id: 4, parent: 3 },
        { id: 5, parent: 4 },
        { id: 6, parent: 5 },
        { id: 7, parent: 2 },
        { id: 8, parent: 7 },
      ].map((item) => {
        item.title = `Node ${item.id}`;
        return item;
      }).forEach((item) => {
        tree.add((parentNode) => {
          return parentNode.get('id') === item.parent;
        }, item);
      });

      expect(tree instanceof Tree).to.equal(true);
      expect(tree.rootNode instanceof Node).to.equal(true);

      expect(tree.rootNode.get('id')).to.equal(1);
      expect(tree.rootNode.children[0].get('id')).to.equal(2);
      expect(tree.rootNode.children[1].get('id')).to.equal(3);

      expect(tree.rootNode.children[1].children[0].get('id')).to.equal(4);
      expect(tree.rootNode.children[1].children[0].children[0].get('id')).to.equal(5);
      expect(tree.rootNode.children[1].children[0].children[0].children[0].get('id')).to.equal(6);

      showTree(tree);

    });
  });

});


function showTree(tree) {
  console.log(tree.rootNode.content);
  tree.rootNode.children.forEach((item) => {
    console.log('\t', item.content, item.children.length);
    item.children.forEach((item)=>{
      console.log('\t\t', item.content);
      item.children.forEach((item)=>{
        console.log('\t\t\t', item.content);
        item.children.forEach((item)=>{
          console.log('\t\t\t\t', item.content);
          item.children.forEach((item)=>{
            console.log('\t\t\t\t\t', item.content);
          });
        });
      })
    })
  });
}
