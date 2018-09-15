const errors = require('../../errors');

const list = require('./list');
const optional = require('./optional');

// This parser is used for required number params,
//  and will reject undefined or non-numeric values
function parseNumber(param) {
  // Empty value should throw an error
  if (param === null || param === undefined) {
    throw new Error(errors.ERROR_CODE_INVALID_NUMBER);
  }

  const num = Number(param);
  if (Number.isNaN(num)) {
    throw new Error(errors.ERROR_CODE_INVALID_NUMBER);
  }
  return num;
}

// This parser is used for optional number params
function parseOptionalNumber(param) {
  return optional.parser(parseNumber)(param);
}

// This parser is used for required list of numbers params,
//  where every element in the list must be a required number
function parseNumberList(param) {
  return list.parser(parseNumber)(param);
}

// This parser is used for optional list of numbers params,
//  where every element in the list must be a required number
function parseOptionalNumberList(param) {
  return optional.parser(parseNumberList)(param);
}

module.exports = {
  parseNumber,
  parseNumberList,
  parseOptionalNumber,
  parseOptionalNumberList,
};
