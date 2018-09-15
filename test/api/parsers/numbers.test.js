const { expect } = require('chai');

const errors = require('../../../lib/errors');
const numberParsers = require('../../../lib/api/parsers/numbers');

describe('parsers.numbers', () => {
  describe('parseNumber', () => {
    it('should throw an error for invalid number param', () => {
      const error = errors.ERROR_CODE_INVALID_NUMBER;

      expect(() => numberParsers.parseNumber()).to.throw(error);
      expect(() => numberParsers.parseNumber(null)).to.throw(error);
      expect(() => numberParsers.parseNumber(undefined)).to.throw(error);

      expect(() => numberParsers.parseNumber('val')).to.throw(error);
      expect(() => numberParsers.parseNumber([1, 2, 3])).to.throw(error);
      expect(() => numberParsers.parseNumber(['a', 'b', 'c'])).to.throw(error);
      expect(() => numberParsers.parseNumber({})).to.throw(error);
      expect(() => numberParsers.parseNumber({ key: 2 })).to.throw(error);
    });

    it('should parse and coerce param to number', () => {
      expect(numberParsers.parseNumber(0)).to.equal(0);
      expect(numberParsers.parseNumber(10)).to.equal(10);
      expect(numberParsers.parseNumber(-20)).to.equal(-20);

      expect(numberParsers.parseNumber('0')).to.equal(0);
      expect(numberParsers.parseNumber('1')).to.equal(1);
      expect(numberParsers.parseNumber('-11')).to.equal(-11);

      expect(numberParsers.parseNumber(true)).to.equal(1);
      expect(numberParsers.parseNumber(false)).to.equal(0);

      expect(numberParsers.parseNumber([])).to.equal(0);
      expect(numberParsers.parseNumber([10])).to.equal(10);
    });
  });

  describe('parseOptionalNumber', () => {
    it('should throw an error for invalid number param', () => {
      const error = errors.ERROR_CODE_INVALID_NUMBER;

      expect(() => numberParsers.parseOptionalNumber('val')).to.throw(error);
      expect(() => numberParsers.parseOptionalNumber([1, 2, 3])).to.throw(error);
      expect(() => numberParsers.parseOptionalNumber(['a', 'b', 'c'])).to.throw(error);
      expect(() => numberParsers.parseOptionalNumber({})).to.throw(error);
      expect(() => numberParsers.parseOptionalNumber({ key: 2 })).to.throw(error);
    });

    it('should parse and coerce param to number', () => {
      expect(numberParsers.parseOptionalNumber()).to.equal(undefined);
      expect(numberParsers.parseOptionalNumber(null)).to.equal(undefined);
      expect(numberParsers.parseOptionalNumber(undefined)).to.equal(undefined);

      expect(numberParsers.parseOptionalNumber(0)).to.equal(0);
      expect(numberParsers.parseOptionalNumber(10)).to.equal(10);
      expect(numberParsers.parseOptionalNumber(-20)).to.equal(-20);

      expect(numberParsers.parseOptionalNumber('0')).to.equal(0);
      expect(numberParsers.parseOptionalNumber('1')).to.equal(1);
      expect(numberParsers.parseOptionalNumber('-11')).to.equal(-11);

      expect(numberParsers.parseOptionalNumber(true)).to.equal(1);
      expect(numberParsers.parseOptionalNumber(false)).to.equal(0);

      expect(numberParsers.parseOptionalNumber([])).to.equal(0);
      expect(numberParsers.parseOptionalNumber([10])).to.equal(10);
    });
  });

  describe('parseNumberList', () => {
    it('should throw an error for invalid number list param', () => {
      const error = errors.ERROR_CODE_INVALID_ARRAY;

      expect(() => numberParsers.parseNumberList()).to.throw(error);
      expect(() => numberParsers.parseNumberList(null)).to.throw(error);
      expect(() => numberParsers.parseNumberList(undefined)).to.throw(error);

      expect(() => numberParsers.parseNumberList(10)).to.throw(error);
      expect(() => numberParsers.parseNumberList({})).to.throw(error);
      expect(() => numberParsers.parseNumberList('')).to.throw(error);
      expect(() => numberParsers.parseNumberList(true)).to.throw(error);

      expect(() => numberParsers.parseNumberList([1, 2, 'a'])).to.throw(
        errors.ERROR_CODE_INVALID_NUMBER,
      );
    });

    it('should parse and coerce param to number list', () => {
      expect(numberParsers.parseNumberList([])).to.deep.equal([]);
      expect(numberParsers.parseNumberList([-3])).to.deep.equal([-3]);
      expect(numberParsers.parseNumberList([1, 3, 5])).to.deep.equal([1, 3, 5]);

      expect(numberParsers.parseNumberList(['10'])).to.deep.equal([10]);
      expect(numberParsers.parseNumberList([1, '2', '-1'])).to.deep.equal([1, 2, -1]);
      expect(numberParsers.parseNumberList([true, false])).to.deep.equal([1, 0]);
      expect(numberParsers.parseNumberList(['0', 0])).to.deep.equal([0, 0]);
    });
  });

  describe('parseOptionalNumberList', () => {
    it('should throw an error for invalid number list param', () => {
      const error = errors.ERROR_CODE_INVALID_ARRAY;

      expect(() => numberParsers.parseOptionalNumberList(10)).to.throw(error);
      expect(() => numberParsers.parseOptionalNumberList({})).to.throw(error);
      expect(() => numberParsers.parseOptionalNumberList('')).to.throw(error);
      expect(() => numberParsers.parseOptionalNumberList(true)).to.throw(error);

      expect(() => numberParsers.parseOptionalNumberList([1, 2, 'a'])).to.throw(
        errors.ERROR_CODE_INVALID_NUMBER,
      );
    });

    it('should parse and coerce param to number list', () => {
      expect(numberParsers.parseOptionalNumberList()).to.deep.equal(undefined);
      expect(numberParsers.parseOptionalNumberList(null)).to.deep.equal(undefined);
      expect(numberParsers.parseOptionalNumberList(undefined)).to.deep.equal(undefined);

      expect(numberParsers.parseOptionalNumberList([])).to.deep.equal([]);
      expect(numberParsers.parseOptionalNumberList([-3])).to.deep.equal([-3]);
      expect(numberParsers.parseOptionalNumberList([1, 3, 5])).to.deep.equal([1, 3, 5]);

      expect(numberParsers.parseOptionalNumberList(['10'])).to.deep.equal([10]);
      expect(numberParsers.parseOptionalNumberList([1, '2', '-1'])).to.deep.equal([1, 2, -1]);
      expect(numberParsers.parseOptionalNumberList([true, false])).to.deep.equal([1, 0]);
      expect(numberParsers.parseOptionalNumberList(['0', 0])).to.deep.equal([0, 0]);
    });
  });
});
