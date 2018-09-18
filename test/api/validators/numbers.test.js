const { expect } = require('chai');

const numberValidators = require('../../../lib/api/validators/numbers');

describe('validators.numbers', () => {
  const error = 'test_number_validation_error';

  describe('validateMin', () => {
    const zeroValidator = numberValidators.validateMin(0, error);
    const tenValidator = numberValidators.validateMin(10, error);

    it('should reject invalid numbers', () => {
      expect(() => zeroValidator(-100)).to.throw(error);
      expect(() => zeroValidator(-10)).to.throw(error);
      expect(() => zeroValidator(-1)).to.throw(error);

      expect(() => tenValidator(-100)).to.throw(error);
      expect(() => tenValidator(-10)).to.throw(error);
      expect(() => tenValidator(-1)).to.throw(error);
      expect(() => tenValidator(0)).to.throw(error);
      expect(() => tenValidator(1)).to.throw(error);
      expect(() => tenValidator(9)).to.throw(error);
    });

    it('should allow valid numbers', () => {
      expect(zeroValidator(0)).to.equal(undefined);
      expect(zeroValidator(1)).to.equal(undefined);
      expect(zeroValidator(10)).to.equal(undefined);
      expect(zeroValidator(100)).to.equal(undefined);

      expect(tenValidator(10)).to.equal(undefined);
      expect(tenValidator(11)).to.equal(undefined);
      expect(tenValidator(100)).to.equal(undefined);
    });
  });

  describe('validateMax', () => {
    const zeroValidator = numberValidators.validateMax(0, error);
    const tenValidator = numberValidators.validateMax(10, error);

    it('should reject invalid numbers', () => {
      expect(() => zeroValidator(1)).to.throw(error);
      expect(() => zeroValidator(10)).to.throw(error);
      expect(() => zeroValidator(100)).to.throw(error);

      expect(() => tenValidator(11)).to.throw(error);
      expect(() => tenValidator(100)).to.throw(error);
    });

    it('should allow valid numbers', () => {
      expect(zeroValidator(-100)).to.equal(undefined);
      expect(zeroValidator(-10)).to.equal(undefined);
      expect(zeroValidator(-1)).to.equal(undefined);
      expect(zeroValidator(0)).to.equal(undefined);

      expect(tenValidator(-100)).to.equal(undefined);
      expect(tenValidator(-10)).to.equal(undefined);
      expect(tenValidator(-1)).to.equal(undefined);
      expect(tenValidator(0)).to.equal(undefined);
      expect(tenValidator(1)).to.equal(undefined);
      expect(tenValidator(10)).to.equal(undefined);
    });
  });

  describe('validateMinMax', () => {
    const digitValidator = numberValidators.validateMinMax(1, 10, error);
    const negativeValidator = numberValidators.validateMinMax(-10, -1, error);

    it('should reject invalid numbers', () => {
      expect(() => digitValidator(-100)).to.throw(error);
      expect(() => digitValidator(-10)).to.throw(error);
      expect(() => digitValidator(-1)).to.throw(error);
      expect(() => digitValidator(0)).to.throw(error);
      expect(() => digitValidator(11)).to.throw(error);
      expect(() => digitValidator(100)).to.throw(error);

      expect(() => negativeValidator(-100)).to.throw(error);
      expect(() => negativeValidator(-11)).to.throw(error);
      expect(() => negativeValidator(0)).to.throw(error);
      expect(() => negativeValidator(1)).to.throw(error);
      expect(() => negativeValidator(10)).to.throw(error);
      expect(() => negativeValidator(100)).to.throw(error);
    });

    it('should allow valid numbers', () => {
      expect(digitValidator(1)).to.equal(undefined);
      expect(digitValidator(4)).to.equal(undefined);
      expect(digitValidator(6)).to.equal(undefined);
      expect(digitValidator(9)).to.equal(undefined);

      expect(negativeValidator(-10)).to.equal(undefined);
      expect(negativeValidator(-9)).to.equal(undefined);
      expect(negativeValidator(-7)).to.equal(undefined);
      expect(negativeValidator(-3)).to.equal(undefined);
      expect(negativeValidator(-1)).to.equal(undefined);
    });
  });
});
