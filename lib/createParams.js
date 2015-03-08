var assign = Object.assign || require('object.assign');
var optionParser = require('./optionParser');


function applyDefaults(params, defaults) {
  return  assign(defaults, params);
}

module.exports = function(args, defaults) {

  var params = {};
  args.forEach(function(arg){
    var param = optionParser(arg);
    assign(params, param);
  });

  if (defaults) {
    params = applyDefaults(params, defaults);
  }

  return params;
}
