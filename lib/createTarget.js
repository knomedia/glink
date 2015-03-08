module.exports = function(values, config) {

  var defaultDelimiter = config.templateDefaultDelimiter || '===';
  var template = config.template;
  var defaults = config.templateDefaults;

  defaults.forEach(function(def, index){
    var ar = def.split(defaultDelimiter)
    var expression = ar[0];
    var value = ar[1];
    if (values[index]) {
      value = values[index];
    }
    template = template.replace(expression, value);
  });
  return template;
}
