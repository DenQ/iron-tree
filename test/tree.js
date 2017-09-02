 chai = require('chai')
  , assert = chai.assert
  , expect = chai.expect
  , should = chai.should();

let Tree = require('../src/tree');
let tree = new Tree();

describe('Tree', function() {
  beforeEach(function() {
    tree = new Tree();
  });

  it('It exists', function() {
    expect(tree instanceof Tree).to.equal(true);

  });

});
