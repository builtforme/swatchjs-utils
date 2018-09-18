// Utility function to validate that a parameter is optional,
//  allows null/undefined values but validating non-empty values
function parser(parserFn) {
  function parseOptional(param) {
    // Empty value should return undefined
    if (param === null || param === undefined) {
      return undefined;
    }

    // Otherwise run standard required validator
    return parserFn(param);
  }

  return parseOptional;
}

module.exports = {
  parser,
};
