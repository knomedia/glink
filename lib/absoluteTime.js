var pattern = /^-(\d+)(\w+)$/;

var unitMap = {
  s: 'Seconds',
  min: 'Minutes',
  m: 'Minutes',
  h: 'Hours',
  hr: 'Hours',
  d: 'Date',
  mon: 'Month'
};

var multiplierMap = {
  w: 7,
  y: 365
};

function offsetBy(amount, unit) {
  if (!unitMap[unit] && !multiplierMap[unit]) {
    return null;
  }
  var date = new Date();
  var multiplier = 1;
  if (multiplierMap[unit]) {
    amount = amount * multiplierMap[unit];
    unit = 'd';
  }
  var setMethod = 'set' + unitMap[unit];
  var getMethod = 'get' + unitMap[unit];
  date[setMethod](date[getMethod]() - amount);
  return date;
}

function absoluteTime(str) {
  var results = str.match(pattern);
  var date = null;
  if (results) {
    var amount = results[1];
    var unit = results[2];
    date = offsetBy(amount, unit);
  } else if (str === 'now') {
    return new Date();
  }
  return date;
}

module.exports = absoluteTime;
