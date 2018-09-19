const _ = require('lodash');

const errors = require('../../errors');
const optional = require('./optional');

// This parser is used for required object params, but
//  rejects arrays and will not validate any key/values
function parseObject(param) {
  // Empty value should throw an error
  if (param === null || param === undefined) {
    throw new Error(errors.ERROR_CODE_INVALID_OBJECT);
  }

  // Param must be an object and must not be an array
  if (!_.isPlainObject(param)) {
    throw new Error(errors.ERROR_CODE_INVALID_OBJECT);
  }

  return param;
}

// This parser is used for required object params, and
//  will allow null/undefined but reject non-object values
function parseOptionalObject(param) {
  return optional.parser(parseObject)(param);
}

module.exports = {
  parseObject,
  parseOptionalObject,
};
