 chai = require('chai')
  , assert = chai.assert
  , expect = chai.expect
  , should = chai.should();

var Node = require('../node');

const rootContent = {
  id: 1,
  name: 'Root',
}
let node = new Node(rootContent);

describe('Node', function() {
  beforeEach(function() {
    node = new Node(rootContent);
  });

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

  it('Add child nodes', function() {
    const childNode = node.add({ id: 2, name: 'Two node'});

    expect(childNode instanceof Node).to.equal(true);
    expect(node.children).to.have.lengthOf(1);
    expect(node.length).to.equal(1);
  });

  it('Add child nodes with length', function() {
    node.add({ id: 2, name: 'Two node'});
    node.add({ id: 3, name: 'Three node'});

    expect(node.children).to.have.lengthOf(2);
    expect(node.length).to.equal(2);
  });


  it('Remove child node', function() {
    node.add({ id: 2, name: 'Two node'});
    node.add({ id: 3, name: 'Three node'});
    const removedNodes = node.remove((itemNode) => {
      return itemNode.get('id') === 3;
    });

    expect(node.length).to.equal(1);
    expect(removedNodes.length).to.equal(1);
  });

  it('Incorrect remove child node', function() {
    node.add({ id: 2, name: 'Two node'});
    node.add({ id: 3, name: 'Three node'});
    const removedNodes = node.remove((itemNode) => {
      return itemNode.get('id') === 333;
    });

    expect(node.length).to.equal(2);
    expect(removedNodes.length).to.equal(0);
  });


});
