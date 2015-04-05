module.exports = function(target, func, value) {
  if (typeof value !== 'number') {
    value = '"' + value + '"';
  }
  target = func + '(' + target + ',' + value + ')';
  return target;
}