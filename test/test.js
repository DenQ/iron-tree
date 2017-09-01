 chai = require('chai')
  , assert = chai.assert
  , expect = chai.expect
  , should = chai.should();

var Node = require('../node');

const rootContent = {
  id: 1,
  name: 'Root',
}

describe('Node', function() {

  it('Check children and content field', function() {
    const node = new Node(rootContent);
    const { children, content } = node;

    assert.isArray(children);
    expect(children).to.have.lengthOf(0);
    expect(content.name).to.equal(rootContent.name);
  });

  it('Check correct work getter', function() {
    const node = new Node(rootContent);
    assert.equal(rootContent.name, node.get('name'));
    expect(node.get('lastname')).to.equal(undefined);
  });

  it('Add child nodes', function() {
    const node = new Node(rootContent);
    const childNode = node.add({ id: 2, name: 'Two node'});
    expect(childNode instanceof Node).to.equal(true);
    expect(node.children).to.have.lengthOf(1);
  });


});
