var createParams = require('../../lib/createParams')
    assert = require('assert')
    ok = assert.ok
    equal = assert.equal,
    deepEqual = assert.deepEqual;

describe('createParams', function() {

  it('should return an object with each option', function(){
    var params = createParams([
      '--format=-2weeks',
      '--key=value'
    ]);
    deepEqual(params, {
      format: '-2weeks',
      key: 'value'
    });
  });

  it('should apply default values when provided', function() {
    var args = [
      '--format=-2weeks',
      '--key=value'
    ];
    var defaults = {
      format: '1day',
      foo: 'bar',
      baz: 'qux'
    }
    var params = createParams(args, defaults);
    deepEqual(params, {
      format: '-2weeks',
      key: 'value',
      foo: 'bar',
      baz: 'qux'
    });
  });

});
