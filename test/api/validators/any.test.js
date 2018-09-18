const { expect } = require('chai');

const errors = require('../../../lib/errors');
const anyValidators = require('../../../lib/api/validators/any');

describe('validators.any', () => {
  const params = [
    '',
    {},
    [],
    true,
    '100',
    65,
    'test string',
  ];

  describe('validateNotUndefined', () => {
    it('should allow valid parameters', () => {
      expect(anyValidators.validateNotUndefined(null)).to.equal(undefined);

      params.forEach((param) => {
        expect(anyValidators.validateNotUndefined(param)).to.equal(undefined);
      });
    });

    it('should reject undefined parameters', () => {
      const error = errors.ERROR_CODE_PARAMETER_UNDEFINED;
      expect(() => anyValidators.validateNotUndefined(undefined)).to.throw(error);
    });
  });

  describe('validateNotNull', () => {
    it('should allow valid parameters', () => {
      expect(anyValidators.validateNotNull(undefined)).to.equal(undefined);

      params.forEach((param) => {
        expect(anyValidators.validateNotNull(param)).to.equal(undefined);
      });
    });

    it('should reject null parameters', () => {
      const error = errors.ERROR_CODE_PARAMETER_NULL;
      expect(() => anyValidators.validateNotNull(null)).to.throw(error);
    });
  });

  describe('validateNotNullOrUndefined', () => {
    it('should allow valid parameters', () => {
      params.forEach((param) => {
        expect(anyValidators.validateNotNullOrUndefined(param)).to.equal(undefined);
      });
    });

    it('should reject null parameters', () => {
      const error = errors.ERROR_CODE_PARAMETER_UNDEFINED;
      expect(() => anyValidators.validateNotNullOrUndefined(null)).to.throw(error);
      expect(() => anyValidators.validateNotNullOrUndefined(undefined)).to.throw(error);
    });
  });
});
