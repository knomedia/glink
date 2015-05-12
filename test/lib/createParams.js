var createParams = require('../../lib/createParams')
    assert = require('assert')
    ok = assert.ok
    equal = assert.equal,
    deepEqual = assert.deepEqual,
    absoluteTime = require('../../lib/absoluteTime'),
    strftime = require('strftime');

function createOffsetDate(relative) {
  var date = absoluteTime(relative);
  return strftime('%H:%M_%Y%m%d', date);
}

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

  it('should convert known relative times with absoluteTime=true', function(){
    var args = [
      '--template=grafana',
      '--key=value'
    ];
    var defaults = {
      from: '-1d',
      foo: 'bar',
      baz: 'qux'
    }
    var params = createParams(args, defaults, true);
    deepEqual(params, {
      template: 'grafana',
      from: createOffsetDate('-1d'),
      key: 'value',
      foo: 'bar',
      baz: 'qux'
    });
  });

  it('should convert "now" with absoluteTime=true', function(){
    var args = [
      '--template=grafana',
      '--key=value'
    ];
    var defaults = {
      from: 'now',
      foo: 'bar',
      baz: 'qux'
    }
    var params = createParams(args, defaults, true);
    deepEqual(params, {
      template: 'grafana',
      from: createOffsetDate('now'),
      key: 'value',
      foo: 'bar',
      baz: 'qux'
    });
  });

});
