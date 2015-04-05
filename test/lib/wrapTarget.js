var wrap = require('../../lib/wrapTarget');
var assert = require('assert');

describe('wrapTarget', function(){
  it('wraps with strings', function(){
    var target = 'one.two.three';
    var result = wrap(target, 'alias', 'node');
    assert.equal(result, 'alias(one.two.three,"node")');
  });

  it('wraps with numbers', function(){
    var target = 'one.two.three';
    var result = wrap(target, 'movingAverage', 5);
    assert.equal(result, 'movingAverage(one.two.three,5)');
  });
});
