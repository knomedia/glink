var createLink = require('../../lib/createLink')
    assert = require('assert')
    ok = assert.ok
    equal = assert.equal;


describe('createLink', function() {

  it('applies applies the render path', function(){
    var uri = createLink({
      hostname: 'example.com'
    });
    equal('https://example.com/render', uri);
  })

  it('applies default protocol', function(){
    var uri = createLink({
      hostname: 'example.com'
    });
    equal('https://example.com/render', uri);
  })

  it('uses default protocol if passed in value is undefined', function() {
    var uri = createLink({
      hostname: 'example.com',
      protocol: undefined
    });
    equal('https://example.com/render', uri);
  });

  it('applies given  protocol', function(){
    var uri = createLink({
      hostname: 'example.com',
      protocol: 'http'
    });
    equal('http://example.com/render', uri);
  })

  it('doesnt adds port if given', function() {
    var uri = createLink({
      hostname: 'example.com',
      port: '19'
    });
    equal('https://example.com:19/render', uri);
  });

});
