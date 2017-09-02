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

  it('It exists', function() {
    expect(tree instanceof Tree).to.equal(true);
  });


  describe('Constructor', function() {

    it('With params', function() {
      expect(tree.rootNode instanceof Node).to.equal(true);
    });

    it('Without params', function() {
      const tree = new Tree();

      expect(tree.rootNode instanceof Node).to.equal(false);
      expect(tree.rootNode).to.equal(null);
    });

  });

});
