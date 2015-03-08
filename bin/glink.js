#!/usr/bin/env node

var config = require('../config.template.json');
var glink = require('../lib/glink');

var link = glink(config, process.argv.slice(2));
console.log(link);
