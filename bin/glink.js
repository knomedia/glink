#!/usr/bin/env node

var copy = require("copy-paste").copy;
var createLink = require('../lib/createLink');
var createParams = require('../lib/createParams');
var argsParser = require('../lib/argsParser');
var createTarget = require('../lib/createTarget');

var argTypes = argsParser(process.argv.slice(2));

var template = 'stats.timers.canvas.prod.request.!!#controller#!!.!!#action#!!';
var templateDefaults = [
  '!!#controller#!!===files',
  '!!#action#!!===index'
]
var target = createTarget(template, argTypes.targetArgs, templateDefaults);

var paramDefaults = {
  from: '-1week',
  width: '450',
  height: '450',
  target: target
}
var params = createParams(argTypes.params, paramDefaults);

var link = createLink({
  hostname: 'graphite.insops.net',
  query: params
});

copy(link);
console.log(link);
