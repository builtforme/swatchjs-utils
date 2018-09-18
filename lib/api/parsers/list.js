const _ = require('lodash');

const errors = require('../../errors');

// Utility function to validate that a parameter is an array,
//  and will also parse any elements in the array to given type
function parser(parserFn) {
  function parseList(param) {
    // Throw an error unless in the input param is an array
    if (!_.isArray(param)) {
      throw new Error(errors.ERROR_CODE_INVALID_ARRAY);
    }

    return param.map(parserFn);
  }

  return parseList;
}

module.exports = {
  parser,
};
