var Uri = require('lil-uri');
var assign = Object.assign || require('object.assign');


function applyDefaults(options) {
  var defaults = {
    protocol: 'https'
  };
  return assign(defaults, options);
}

/*
 *  @param options {
 *    host: 'graphite.example.com', // default ''
 *    query: {target: 'some.graphite.target}, // default {}
 *    protocol: 'https', // default 'https'
 *    port: 443 // default undefined
 *  }
 */

module.exports = function(options) {
  options = applyDefaults(options);
  var url = new Uri();
  url.protocol(options.protocol);
  url.hostname(options.hostname);
  url.port(options.port);
  url.path('/render');
  if (options.query)  {
    url.query(options.query);
  }
  return url.build();
}
