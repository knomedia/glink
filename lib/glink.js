var createLink = require('./createLink');
var createParams = require('./createParams');
var argsParser = require('./argsParser');
var createTarget = require('./createTarget');

module.exports = function(config, args){
  var argTypes = argsParser(args);
  var target = createTarget(argTypes.targetArgs, config);

  var paramDefaults = config.paramsDefaults || {};
  paramDefaults.target = target;

  var params = createParams(argTypes.params, paramDefaults, config.absoluteTimes);

  linkOptions = {
    protocol: config.protocol,
    hostname: config.hostname,
    port: config.port,
    query: params
  }

  return createLink(linkOptions);
}
