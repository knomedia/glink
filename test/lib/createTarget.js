var createTarget = require('../../lib/createTarget')
    assert = require('assert')
    ok = assert.ok
    equal = assert.equal,
    deepEqual = assert.deepEqual;

describe('createTarget', function() {

  it('should use template defaults when values not provided', function() {
    var template = 'stats.timers.prod.request.!!#controller#!!.!!#action#!!.!!#type#!!';
    var templateDefaults = [
      '!!#controller#!!===files',
      '!!#action#!!===index',
      '!!#type#!!==={mean,median,upper_95}'
    ]
    var values = ['admin', 'show']
    var target = createTarget(template, values, templateDefaults);
    var expected = 'stats.timers.prod.request.admin.show.{mean,median,upper_95}'
    equal(target, expected);
  });

  it('should use use passed in defaultDelimiter', function() {
    var template = 'stats.timers.prod.request.!!#controller#!!.!!#action#!!.!!#type#!!';
    var templateDefaults = [
      '!!#controller#!!***files',
      '!!#action#!!***index',
      '!!#type#!!***{mean,median,upper_95}'
    ]
    var values = ['admin', 'show']
    var target = createTarget(template, values, templateDefaults, '***');
    var expected = 'stats.timers.prod.request.admin.show.{mean,median,upper_95}'
    equal(target, expected);
  });

  it('should allow for custom expressions', function() {
    var template = 'fee.fii.foo.fum.<<<controller>>>.<%action%>.!!#type#!!';
    var templateDefaults = [
      '<<<controller>>>***files',
      '<%action%>***index',
      '!!#type#!!***{mean,median,upper_95}'
    ]
    var values = ['admin', 'show', '{sum}']
    var target = createTarget(template, values, templateDefaults, '***');
    var expected = 'fee.fii.foo.fum.admin.show.{sum}'
    equal(target, expected);
  });

});

