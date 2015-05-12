var absoluteTime = require('../../lib/absoluteTime')
    assert = require('assert')
    ok = assert.ok

describe('absoluteTime', function() {

  it('should build valid dates for second offset', function(){
    var results = absoluteTime('-5s');
    var expected = new Date();
    expected.setSeconds(expected.getSeconds() - 5);
    assert.equal(results.toString(), expected.toString());
  });

  it('should build valid dates for minute offset', function(){
    var results = absoluteTime('-10min');
    var expected = new Date();
    expected.setMinutes(expected.getMinutes() - 10);
    assert.equal(results.toString(), expected.toString());
  });

  it('should build valid dates for hour offset', function(){
    var results = absoluteTime('-4d');
    var expected = new Date();
    expected.setDate(expected.getDate() - 4);
    assert.equal(results.toString(), expected.toString());
  });

  it('should build valid dates for week offset', function(){
    var results = absoluteTime('-3w');
    var expected = new Date();
    expected.setDate(expected.getDate() - (3 * 7));
    assert.equal(results.toString(), expected.toString());
  });

  it('should build valid dates for month offset', function(){
    var results = absoluteTime('-2mon');
    var expected = new Date();
    expected.setMonth(expected.getMonth() - 2);
    assert.equal(results.toString(), expected.toString());
  });

  it('should build valid dates for year offset', function(){
    var results = absoluteTime('-2y');
    var expected = new Date();
    expected.setDate(expected.getDate() - (2 * 365));
    assert.equal(results.toString(), expected.toString());
  });

  it('should return null for unrecognized formats', function(){
    var results = absoluteTime('-fskjl');
    assert.equal(results, null);
  });

  it('should return null for close, but unrecognized formats', function(){
    var results = absoluteTime('-3day');
    assert.equal(results, null);
    results = absoluteTime('-7Mon')
    assert.equal(results, null);
    results = absoluteTime('-1Y')
    assert.equal(results, null);
    results = absoluteTime('-7Y')
    assert.equal(results, null);
    results = absoluteTime('-2W')
    assert.equal(results, null);
  });

  it('should return current date for "now"', function(){
     var results = absoluteTime('now');
     assert.equal(results.toString(), (new Date()).toString());
  });

});
