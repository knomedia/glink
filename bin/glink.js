#!/usr/bin/env node

var copy = require("copy-paste").copy;
var createLink = require('../lib/createLink');
var paramBuilder = require('../lib/paramBuilder');

var args = process.argv.slice(2);
var params = paramBuilder(args);
var link = createLink({
  hostname: 'graphite.insops.net',
  query: params
});

copy(link);
console.log(link);
