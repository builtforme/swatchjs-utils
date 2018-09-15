const { expect } = require('chai');

const booleanParsers = require('../../../lib/api/parsers/boolean');

describe('parsers.boolean', () => {
  describe('parseBoolean', () => {
    it('should parse and coerce param to boolean', () => {
      expect(booleanParsers.parseBoolean()).to.equal(false);
      expect(booleanParsers.parseBoolean(undefined)).to.equal(false);

      expect(booleanParsers.parseBoolean(true)).to.equal(true);
      expect(booleanParsers.parseBoolean('true')).to.equal(true);
      expect(booleanParsers.parseBoolean(false)).to.equal(false);
      expect(booleanParsers.parseBoolean('false')).to.equal(false);

      expect(booleanParsers.parseBoolean('')).to.equal(false);
      expect(booleanParsers.parseBoolean(0)).to.equal(false);
      expect(booleanParsers.parseBoolean(null)).to.equal(false);

      expect(booleanParsers.parseBoolean('value')).to.equal(true);
      expect(booleanParsers.parseBoolean('argument1')).to.equal(true);
      expect(booleanParsers.parseBoolean(' a_value  ')).to.equal(true);
      expect(booleanParsers.parseBoolean('test.value')).to.equal(true);

      expect(booleanParsers.parseBoolean(100)).to.equal(true);
      expect(booleanParsers.parseBoolean(12345)).to.equal(true);

      expect(booleanParsers.parseBoolean({})).to.equal(true);
      expect(booleanParsers.parseBoolean({ a: 100 })).to.equal(true);
      expect(booleanParsers.parseBoolean([])).to.equal(true);
      expect(booleanParsers.parseBoolean(['a', 'b', 'c'])).to.equal(true);
    });
  });

  describe('parseOptionalBoolean', () => {
    it('should parse and coerce param to boolean', () => {
      expect(booleanParsers.parseOptionalBoolean()).to.equal(undefined);
      expect(booleanParsers.parseOptionalBoolean(null)).to.equal(undefined);
      expect(booleanParsers.parseOptionalBoolean(undefined)).to.equal(undefined);

      expect(booleanParsers.parseOptionalBoolean(true)).to.equal(true);
      expect(booleanParsers.parseOptionalBoolean('true')).to.equal(true);
      expect(booleanParsers.parseOptionalBoolean(false)).to.equal(false);
      expect(booleanParsers.parseOptionalBoolean('false')).to.equal(false);

      expect(booleanParsers.parseOptionalBoolean('')).to.equal(false);
      expect(booleanParsers.parseOptionalBoolean(0)).to.equal(false);

      expect(booleanParsers.parseOptionalBoolean('value')).to.equal(true);
      expect(booleanParsers.parseOptionalBoolean('argument1')).to.equal(true);
      expect(booleanParsers.parseOptionalBoolean(' a_value  ')).to.equal(true);
      expect(booleanParsers.parseOptionalBoolean('test.value')).to.equal(true);

      expect(booleanParsers.parseOptionalBoolean(100)).to.equal(true);
      expect(booleanParsers.parseOptionalBoolean(12345)).to.equal(true);

      expect(booleanParsers.parseOptionalBoolean({})).to.equal(true);
      expect(booleanParsers.parseOptionalBoolean({ a: 100 })).to.equal(true);
      expect(booleanParsers.parseOptionalBoolean([])).to.equal(true);
      expect(booleanParsers.parseOptionalBoolean(['a', 'b', 'c'])).to.equal(true);
    });
  });
});
