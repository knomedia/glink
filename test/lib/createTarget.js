var createTarget = require('../../lib/createTarget')
    assert = require('assert')
    ok = assert.ok
    equal = assert.equal,
    deepEqual = assert.deepEqual;

describe('createTarget', function() {

  it('should use template defaults when values not provided', function() {
    var config = {};
    config.template = 'stats.timers.prod.request.!!#controller#!!.!!#action#!!.!!#type#!!';
    config.templateDefaults = [
      '!!#controller#!!===files',
      '!!#action#!!===index',
      '!!#type#!!==={mean,median,upper_95}'
    ];
    var values = ['admin', 'show']
    var target = createTarget(values, config);
    var expected = 'stats.timers.prod.request.admin.show.{mean,median,upper_95}'
    equal(target, expected);
  });

  it('should use use passed in defaultDelimiter', function() {
    var config = {};
    config.template = 'stats.timers.prod.request.!!#controller#!!.!!#action#!!.!!#type#!!';
    config.templateDefaults = [
      '!!#controller#!!***files',
      '!!#action#!!***index',
      '!!#type#!!***{mean,median,upper_95}'
    ];
    config.templateDefaultDelimiter = '***';
    var values = ['admin', 'show']
    var target = createTarget(values, config);
    var expected = 'stats.timers.prod.request.admin.show.{mean,median,upper_95}'
    equal(target, expected);
  });

  it('should allow for custom expressions', function() {
    var config = {};
    config.template = 'fee.fii.foo.fum.<<<controller>>>.<%action%>.!!#type#!!';
    config.templateDefaults = [
      '<<<controller>>>***files',
      '<%action%>***index',
      '!!#type#!!***{mean,median,upper_95}'
    ];
    config.templateDefaultDelimiter = '***';
    var values = ['admin', 'show', '{sum}']
    var target = createTarget(values, config);
    var expected = 'fee.fii.foo.fum.admin.show.{sum}'
    equal(target, expected);
  });

});
