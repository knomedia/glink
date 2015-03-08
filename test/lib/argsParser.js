var argsParser = require('../../lib/argsParser')
    assert = require('assert')
    ok = assert.ok
    equal = assert.equal,
    deepEqual = assert.deepEqual;

describe('argsParser', function() {

  it('should return an object with targetArgs and params keys', function(){
    var subject = argsParser([]);
    ok(subject.targetArgs);
    ok(subject.params);
  });

  it('should put non --options in the targetArgs', function() {
    var subject = argsParser(['one', 'two', '--three=value', '--four=value']);
    deepEqual(subject.targetArgs, ['one', 'two'])
  });

  it('should only consider -- valid when at beginning of string', function() {
    var subject = argsParser(['one', 'two--a', '--three=value', '--four=value']);
    deepEqual(subject.targetArgs, ['one', 'two--a'])
  });

  it('should put --options in the params', function() {
    var subject = argsParser(['one', 'two', '--three=value', '--four=value']);
    deepEqual(subject.params, ['--three=value', '--four=value'])
  });

});
