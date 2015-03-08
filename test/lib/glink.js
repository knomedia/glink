var glink = require('../../lib/glink')
    assert = require('assert')
    ok = assert.ok
    equal = assert.equal,
    deepEqual = assert.deepEqual;

function createConfig(params) {
  params = params || {};
  return {
    hostname: 'graphite.example.com',
    template: 'foo.bar.##controller##.##action##',
    templateDefaults: [
      '##controller##***foo',
      '##action##***bar',
    ],
    templateDefaultDelimiter: '***',
    paramsDefaults: params
  };
}

describe('glink', function() {

  it('should build a link', function(){
    var config = createConfig({});
    var args = ['user', 'index'];
    var link = glink(config, args);
    equal(link, 'https://graphite.example.com/render?target=foo.bar.user.index');
  });

  it('should include arg params', function() {
    var config = createConfig({});
    var args = ['user', 'index', '--from=-4months'];
    var link = glink(config, args);
    equal(link, 'https://graphite.example.com/render?target=foo.bar.user.index&from=-4months');
  });

  it('should include default params', function() {
    var config = createConfig({
      width: '800',
      height: '600'
    });
    var args = ['user', 'index', '--from=-4months'];
    var link = glink(config, args);
    equal(link, 'https://graphite.example.com/render?width=800&height=600&target=foo.bar.user.index&from=-4months');
  });

});

