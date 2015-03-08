module.exports = function(template, values, defaults, defaultDelimiter) {

  defaultDelimiter = defaultDelimiter || '===';

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
