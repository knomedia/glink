var targetBuilder = require('../lib/createTarget');
var assign = Object.assign || require('object.assign');

function applyDefaults(params) {
  var defaults = {
    from: '-1week',
    width: '450',
    height: '450'
  }
  return  assign(defaults, params);
}

module.exports = function(args) {
  var controller = args.shift();
  var action = args.shift();

  var params = {};
  args.forEach(function(a){
    var key = a.replace(/--/, '');
    var parts = a.split('=');
    params[parts[0].replace(/--/, '')] = parts[1];
  });

  params = applyDefaults(params);

  var keys = '{mean,median,upper_95}';
  if (!action.match(/{.*}/)){
    action += '.' + keys;
  }

  var target = 'stats.timers.canvas.prod.request.!!#first#!!.!!#second#!!';
  target = targetBuilder(target, controller, action);
  params.target = target;
  return params;
}
