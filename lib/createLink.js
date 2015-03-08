var Uri = require('lil-uri');

function applyDefaults(options) {
  if (!options.protocol) {
    options.protocol = 'https';
  }
  return options;
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
  url.hostname(options.hostname);
  url.port(options.port);
  url.path('/render');
  url.protocol(options.protocol);
  if (options.query)  {
    url.query(options.query);
  }
  return url.build();
}
