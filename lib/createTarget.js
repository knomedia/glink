module.exports = function(values) {
  var controller = values.shift();
  var action = values.shift();

  var keys = '{mean,median,upper_95}';
  if (!action.match(/{.*}/)){
    action += '.' + keys;
  }

  var target = 'stats.timers.canvas.prod.request.!!#first#!!.!!#second#!!';
  target = target.replace(/!!#first#!!/, controller);
  target = target.replace(/!!#second#!!/, action);
  return target;
}
