var coerceParams = require('../../lib/coerceParams'),
    assert = require('assert'),
    strftime = require('strftime'),
    absoluteTime = require('../../lib/absoluteTime');


function createOffsetDate(relative) {
  var date = absoluteTime(relative);
  return strftime('%H:%M_%Y%m%d', date);
}

describe('coerceParams', function() {
  it('converts "from" params to absolute', function(){
    var params = {
      from: '-4d'
    };
    var expected = {
      from: createOffsetDate('-4d')
    };
    assert.deepEqual(coerceParams(params), expected);
  });

  it('converts "until" params to absolute', function(){
    var params = {
      until: '-4min'
    };
    var expected = {
      until: createOffsetDate('-4min')
    };
    assert.deepEqual(coerceParams(params), expected);
  });

  it('keeps values that it doesnt understand', function(){
    var params = {
      from: '-4days' // should be `d` not 'days'
    }
    assert.equal(coerceParams(params).from, '-4days');
  });

});
