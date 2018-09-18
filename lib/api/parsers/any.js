const _ = require('lodash');

const objects = require('./objects');
const optional = require('./optional');

// This parser is used for a required param of any JS type
//  but will return as given, not coerce an argument type
function parseAny(param) {
  // Param can be a basic JS type
  if (_.isBoolean(param)) { return param; }
  if (_.isString(param)) { return param; }
  if (_.isNumber(param) && _.isFinite(param)) { return param; }

  // Param can also be an array
  if (_.isArray(param)) { return param; }

  // Otherwise parse the param as a required JSON object
  return objects.parseObject(param);
}

function parseOptionalAny(param) {
  return optional.parser(parseAny)(param);
}

module.exports = {
  parseAny,
  parseOptionalAny,
};
