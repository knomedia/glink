#!/usr/bin/env node

var glink = require('../lib/glink');
var loadConfig = require('./loadConfig');

var config = loadConfig();
var link = glink(config, process.argv.slice(2));
console.log(link);
