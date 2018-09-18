// Validator that allows a value greater then or equal to a min
function validateMin(minValue, error) {
  function validator(param) {
    // Throw an error if value is less than min value
    if (param < minValue) {
      throw new Error(error);
    }
  }
  return validator;
}

// Validator that allows a value less than or equal to a max
function validateMax(maxValue, error) {
  function validator(param) {
    // Throw an error if value is greater than max value
    if (param > maxValue) {
      throw new Error(error);
    }
  }
  return validator;
}

// Validator that allows a value less than or
//  equal to a max and greater than or equal to a min
function validateMinMax(minValue, maxValue, error) {
  const minValidator = validateMin(minValue, error);
  const maxValidator = validateMax(maxValue, error);

  function validator(param) {
    // Throw an error if value is less than min value
    minValidator(param);
    // Throw an error if value is greater than max value
    maxValidator(param);
  }

  return validator;
}

module.exports = {
  validateMax,
  validateMin,
  validateMinMax,
};
