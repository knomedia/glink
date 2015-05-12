var absoluteTime = require('./absoluteTime');
var strftime = require('strftime');

function convertAbsolute(value) {
  var d = absoluteTime(value);
  if (d) {
    return formatDate(d);
  } else {
    return value;
  }
}

function formatDate(date) {
  return strftime('%H:%M_%Y%m%d', date);
}

function coerceParams(params) {
  if (params.from) {
    params.from = convertAbsolute(params.from)
  }
  if (params.until) {
    params.until = convertAbsolute(params.until)
  }
  return params;
}

module.exports = coerceParams;
