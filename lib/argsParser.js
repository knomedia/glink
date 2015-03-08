module.exports = function(args) {
  var targetArgs = [];
  var params = [];
  args.forEach(function(arg){
    if(arg.match('^--')){
      params.push(arg)
    } else {
      targetArgs.push(arg)
    }
  });
  return {
    targetArgs: targetArgs,
    params: params
  }
}
