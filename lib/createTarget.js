module.exports = function(template, first, second) {
  template = template.replace(/!!#first#!!/, first);
  template = template.replace(/!!#second#!!/, second);
  return template;
}
