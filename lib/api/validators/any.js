const errors = require('../../errors');

function validateNotUndefined(param) {
  if (param === undefined) {
    throw new Error(errors.ERROR_CODE_PARAMETER_UNDEFINED);
  }
}

function validateNotNull(param) {
  if (param === null) {
    throw new Error(errors.ERROR_CODE_PARAMETER_NULL);
  }
}

function validateNotNullOrUndefined(param) {
  if (param === null || param === undefined) {
    throw new Error(errors.ERROR_CODE_PARAMETER_UNDEFINED);
  }
}

module.exports = {
  validateNotNull,
  validateNotNullOrUndefined,
  validateNotUndefined,
};
