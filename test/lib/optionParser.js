var optionParser = require('../../lib/optionParser')
    assert = require('assert')
    ok = assert.ok
    equal = assert.equal,
    deepEqual = assert.deepEqual;

describe('optionParser', function() {

  it('should return an object with a key and value', function(){
    var result = optionParser('--format=-1week');
    assert(result.format);
    equal(result.format, '-1week');
  });

  it('should handle values with -- in them', function() {
    var result = optionParser('--key=1--value');
    assert(result.key);
    equal(result.key, '1--value');
  });

});
