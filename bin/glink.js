#!/usr/bin/env node

var copy = require("copy-paste").copy;
var createLink = require('../lib/createLink');
var createParams = require('../lib/createParams');
var argsParser = require('../lib/argsParser');
var createTarget = require('../lib/createTarget');
var config = require('../config.template.json');

var argTypes = argsParser(process.argv.slice(2));
var target = createTarget(argTypes.targetArgs, config);

var paramDefaults = config.paramsDefaults;
paramDefaults.target = target;

var params = createParams(argTypes.params, paramDefaults);

linkOptions = {
  protocol: config.protocol,
  hostname: config.hostname,
  port: config.port,
  query: params
}

var link = createLink(linkOptions);

copy(link);
console.log(link);
