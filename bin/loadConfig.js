var path = require('path');
var fs = require('fs');

function getUserHome() {
  return process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE;
}

function getConfigFilePath() {
  return path.join(getUserHome(), '.glinkrc');
}

function loadConfig(path) {
  var config = {};
  try {
    config = JSON.parse(fs.readFileSync(path, 'utf8'));
  } catch(e) {
    config = writeDefaultConfig(path);
    notifyOfConfig(path);
  }
  return config;
}

function writeDefaultConfig(path) {
  var data = require('../config.default.json');
  fs.writeFileSync(path, JSON.stringify(data, null, 2));
  return data;
}

function notifyOfConfig(path) {
  console.log('... Wrote new default config');
  console.log('... Edit config values at: ' + path);
}

module.exports = function() {
  return loadConfig(getConfigFilePath());
}
