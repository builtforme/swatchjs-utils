const { expect } = require('chai');

const stringValidators = require('../../../lib/api/validators/strings');

describe('validators.strings', () => {
  const error = 'test_string_validation_error';

  describe('validateMinLength', () => {
    const emptyValidator = stringValidators.validateMinLength(1, error);
    const fiveCharValidator = stringValidators.validateMinLength(5, error);

    it('should reject invalid strings', () => {
      expect(() => emptyValidator('')).to.throw(error);

      expect(() => fiveCharValidator('')).to.throw(error);
      expect(() => fiveCharValidator('a')).to.throw(error);
      expect(() => fiveCharValidator('abcd')).to.throw(error);
    });

    it('should allow valid strings', () => {
      expect(emptyValidator('a')).to.equal(undefined);
      expect(emptyValidator('test')).to.equal(undefined);
      expect(emptyValidator('valid string')).to.equal(undefined);
      expect(emptyValidator('this is also good')).to.equal(undefined);

      expect(fiveCharValidator('valid')).to.equal(undefined);
      expect(fiveCharValidator('valid string')).to.equal(undefined);
      expect(fiveCharValidator('this is also good')).to.equal(undefined);
    });
  });

  describe('validateMaxLength', () => {
    const twoValidator = stringValidators.validateMaxLength(2, error);
    const tenValidator = stringValidators.validateMaxLength(10, error);

    it('should reject invalid strings', () => {
      expect(() => twoValidator('abc')).to.throw(error);
      expect(() => twoValidator('nope')).to.throw(error);
      expect(() => twoValidator('too long')).to.throw(error);

      expect(() => tenValidator('long string')).to.throw(error);
      expect(() => tenValidator('invalid string')).to.throw(error);
      expect(() => tenValidator('this is not good')).to.throw(error);
    });

    it('should allow valid strings', () => {
      expect(twoValidator('')).to.equal(undefined);
      expect(twoValidator('a')).to.equal(undefined);
      expect(twoValidator('ab')).to.equal(undefined);

      expect(tenValidator('')).to.equal(undefined);
      expect(tenValidator('a')).to.equal(undefined);
      expect(tenValidator('the string')).to.equal(undefined);
    });
  });

  describe('validateOptionList', () => {
    const options = ['a', 'b', 'c'];
    const validator = stringValidators.validateOptionList(options, error);

    it('should reject invalid strings', () => {
      expect(() => validator('')).to.throw(error);
      expect(() => validator('d')).to.throw(error);
      expect(() => validator('abc')).to.throw(error);
      expect(() => validator('nope')).to.throw(error);
    });

    it('should allow valid strings', () => {
      expect(validator('a')).to.equal(undefined);
      expect(validator('b')).to.equal(undefined);
      expect(validator('c')).to.equal(undefined);
    });
  });

  describe('validateRegex', () => {
    const guidRegex = '[A-Za-f0-9]{8}-[A-Za-f0-9]{4}-[A-Za-f0-9]{4}-[0-9A-Za-f]{4}-[A-Za-f0-9]{12}';
    const regexString = `^${guidRegex}$`;
    const validator = stringValidators.validateRegex(regexString, error);

    it('should reject invalid strings', () => {
      expect(() => validator('')).to.throw(error);
      expect(() => validator('d')).to.throw(error);
      expect(() => validator('abc')).to.throw(error);
      expect(() => validator('nope')).to.throw(error);
      expect(() => validator('not a guid')).to.throw(error);
      expect(() => validator(' 00000000-0000-0000-0000-000000000000 ')).to.throw(error);
    });

    it('should allow valid strings', () => {
      expect(validator('01234567-89ab-cdef-0123-456789abcdef')).to.equal(undefined);
      expect(validator('00000000-0000-0000-0000-000000000000')).to.equal(undefined);
      expect(validator('ffffffff-ffff-ffff-ffff-ffffffffffff')).to.equal(undefined);
    });
  });
});
