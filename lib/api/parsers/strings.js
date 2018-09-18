const list = require('./list');
const optional = require('./optional');

// This parser is used for required string params, and
//  will coerce a missing argument into the empty string
function parseString(param) {
  if (param === null || param === undefined) {
    return '';
  }
  return String(param).trim();
}

// This parser is used for optional string params, where
//  the handler cares about an undefined/missing argument
function parseOptionalString(param) {
  return optional.parser(parseString)(param);
}

// This parser is used for required list of strings, and
//  will coerce all arrray elements into empty strings
function parseStringList(param) {
  return list.parser(parseString)(param);
}

// This parser is used for optional list of strings, and
//  will coerce all array elements into empty strings
function parseOptionalStringList(param) {
  return optional.parser(parseStringList)(param);
}

module.exports = {
  parseOptionalString,
  parseOptionalStringList,
  parseString,
  parseStringList,
};
