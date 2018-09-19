// Validator that allows a string that matches a regex string
function validateRegex(regexString, error) {
  const regex = new RegExp(regexString);

  function validator(param) {
    // Throw an error if value does not match regex
    if (regex.test(param) === false) {
      throw new Error(error);
    }
  }
  return validator;
}

// Validator that allows a string with minimum length
function validateMinLength(minLength, error) {
  function validator(param) {
    // Throw an error if length is less than min length
    if (param.length < minLength) {
      throw new Error(error);
    }
  }
  return validator;
}

// Validator that allows a string with maximum length
function validateMaxLength(maxLength, error) {
  function validator(param) {
    // Throw an error if length is greater than max length
    if (param.length > maxLength) {
      throw new Error(error);
    }
  }
  return validator;
}

// Validator that allows a string with min and max length
function validateMinMaxLength(minLength, maxLength, error) {
  const minLengthValidator = validateMinLength(minLength, error);
  const maxLengthValidator = validateMaxLength(maxLength, error);

  function validator(param) {
    // Throw an error if length is less than min length
    minLengthValidator(param);
    // Throw an error if length is greater than max length
    maxLengthValidator(param);
  }

  return validator;
}

// Helper function to validate string is in a list of options
function validateOptionList(options, error) {
  function validator(param) {
    // Throw an error if value is not found in options list
    if (!options.includes(param)) {
      throw new Error(error);
    }
  }
  return validator;
}

module.exports = {
  validateMaxLength,
  validateMinLength,
  validateMinMaxLength,
  validateOptionList,
  validateRegex,
};
