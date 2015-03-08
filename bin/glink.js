#!/usr/bin/env node

var copy = require("copy-paste").copy;
var createLink = require('../lib/createLink');
var createParams = require('../lib/createParams');
var argsParser = require('../lib/argsParser');
var createTarget = require('../lib/createTarget');

var argTypes = argsParser(process.argv.slice(2));
var target = createTarget(argTypes.targetArgs);

var defaults = {
  from: '-1week',
  width: '450',
  height: '450',
  target: target
}
var params = createParams(argTypes.params, defaults);

var link = createLink({
  hostname: 'graphite.insops.net',
  query: params
});

copy(link);
console.log(link);
