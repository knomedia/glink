var assign = Object.assign || require('object.assign');
var optionParser = require('./optionParser');
var coerceParams = require('./coerceParams');


function applyDefaults(params, defaults) {
  return  assign(defaults, params);
}

module.exports = function(args, defaults, absoluteTime) {
  absoluteTime = !!absoluteTime;
  var params = {};
  var targets = [];
  args.forEach(function(arg){
    var param = optionParser(arg);
    if (param.target) {
      targets.push(param.target);
    } else {
      assign(params, param);
    }
  });
  if (targets.length) {
    assign(params, {target: targets});
  }
  if (defaults) {
    params = applyDefaults(params, defaults);
  }
  if (absoluteTime) {
    params = coerceParams(params);
  }

  return params;
}
