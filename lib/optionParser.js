module.exports = function(value) {
  option = {};
  var parts = value.split('=');
  option[parts[0].replace(/--/, '')] = parts[1];
  return option;
}
