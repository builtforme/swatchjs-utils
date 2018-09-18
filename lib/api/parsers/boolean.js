const optional = require('./optional');

// This parser is used for required boolean params,
//  and will coerce null or undefined values to false
function parseBoolean(param) {
  // Special handling for string versions of true/false
  if (param === 'true') { return true; }
  if (param === 'false') { return false; }

  // Everything else should let JS coerce to Boolean
  return Boolean(param);
}

// This parser is used for optional boolean params,
//  but will allow true, false, or undefined values
function parseOptionalBoolean(param) {
  return optional.parser(parseBoolean)(param);
}

module.exports = {
  parseBoolean,
  parseOptionalBoolean,
};
