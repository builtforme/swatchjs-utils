const { expect } = require('chai');

const errors = require('../../../lib/errors');
const stringParsers = require('../../../lib/api/parsers/strings');

const error = errors.ERROR_CODE_INVALID_ARRAY;

describe('parsers.strings', () => {
  describe('parseString', () => {
    it('should parse and coerce params to string', () => {
      expect(stringParsers.parseString()).to.equal('');
      expect(stringParsers.parseString('')).to.equal('');
      expect(stringParsers.parseString(null)).to.equal('');
      expect(stringParsers.parseString(undefined)).to.equal('');

      expect(stringParsers.parseString('value')).to.equal('value');
      expect(stringParsers.parseString('argument1')).to.equal('argument1');
      expect(stringParsers.parseString(' a_value  ')).to.equal('a_value');
      expect(stringParsers.parseString('test.value')).to.equal('test.value');

      expect(stringParsers.parseString(100)).to.equal('100');
      expect(stringParsers.parseString(12345)).to.equal('12345');

      expect(stringParsers.parseString(true)).to.equal('true');
      expect(stringParsers.parseString(false)).to.equal('false');

      expect(stringParsers.parseString(['a', 'b', 'c'])).to.equal('a,b,c');
    });
  });

  describe('parseOptionalString', () => {
    it('should parse and coerce params to string but allow undefined', () => {
      expect(stringParsers.parseOptionalString()).to.equal(undefined);
      expect(stringParsers.parseOptionalString(null)).to.equal(undefined);
      expect(stringParsers.parseOptionalString(undefined)).to.equal(undefined);

      expect(stringParsers.parseOptionalString('')).to.equal('');

      expect(stringParsers.parseOptionalString('value')).to.equal('value');
      expect(stringParsers.parseOptionalString('argument1')).to.equal('argument1');
      expect(stringParsers.parseOptionalString(' a_value  ')).to.equal('a_value');
      expect(stringParsers.parseOptionalString('test.value')).to.equal('test.value');

      expect(stringParsers.parseOptionalString(100)).to.equal('100');
      expect(stringParsers.parseOptionalString(12345)).to.equal('12345');

      expect(stringParsers.parseOptionalString(true)).to.equal('true');
      expect(stringParsers.parseOptionalString(false)).to.equal('false');

      expect(stringParsers.parseOptionalString(['a', 'b', 'c'])).to.equal('a,b,c');
    });
  });

  describe('parseStringList', () => {
    it('should parse and return a valid array of strings', () => {
      function checkStringList(input, expected) {
        const result = stringParsers.parseStringList(input);

        expect(result.length).to.equal(expected.length);
        result.forEach((v, idx) => expect(v).to.equal(expected[idx]));
      }

      checkStringList(['a', 'b', 'c'], ['a', 'b', 'c']);
      checkStringList([' a ', ' b  ', '   c '], ['a', 'b', 'c']);
      checkStringList(['test', 1, 2, null, undefined], ['test', '1', '2', '', '']);
    });

    it('should throw an error on an invalid param', () => {
      expect(() => stringParsers.parseStringList(undefined)).to.throw(error);

      expect(() => stringParsers.parseStringList()).to.throw(error);
      expect(() => stringParsers.parseStringList({})).to.throw(error);
      expect(() => stringParsers.parseStringList('test')).to.throw(error);
      expect(() => stringParsers.parseStringList(12345)).to.throw(error);
    });
  });

  describe('parseOptionalStringList', () => {
    it('should parse and return a valid array of strings', () => {
      function checkStringList(input, expected) {
        const result = stringParsers.parseOptionalStringList(input);

        expect(result.length).to.equal(expected.length);
        result.forEach((v, idx) => expect(v).to.equal(expected[idx]));
      }

      expect(stringParsers.parseOptionalStringList()).to.equal(undefined);
      expect(stringParsers.parseOptionalStringList(null)).to.equal(undefined);
      expect(stringParsers.parseOptionalStringList(undefined)).to.equal(undefined);

      checkStringList(['a', 'b', 'c'], ['a', 'b', 'c']);
      checkStringList([' a ', ' b  ', '   c '], ['a', 'b', 'c']);
      checkStringList(['test', 1, 2, null, undefined], ['test', '1', '2', '', '']);
    });

    it('should throw an error on an invalid param', () => {
      expect(() => stringParsers.parseOptionalStringList({})).to.throw(error);
      expect(() => stringParsers.parseOptionalStringList('test')).to.throw(error);
      expect(() => stringParsers.parseOptionalStringList(12345)).to.throw(error);
    });
  });
});
