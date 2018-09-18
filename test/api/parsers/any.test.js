const { expect } = require('chai');

const errors = require('../../../lib/errors');
const anyParsers = require('../../../lib/api/parsers/any');

const error = errors.ERROR_CODE_INVALID_OBJECT;

describe('parsers.any', () => {
  describe('parseAny', () => {
    it('should parse and return an arbitrary data value', () => {
      function checkTargetObject(obj) {
        const result = anyParsers.parseAny(obj);
        expect(result).to.deep.equal(obj);
      }

      // Check that it properly parses objects with expected keys
      const t1 = { id: 'test.id', key: 'something' };
      checkTargetObject(t1);

      const t2 = { id: ' some other item ', key: '-another-' };
      checkTargetObject(t2);

      const t3 = { id: 'user-id1', other: 100, key: 'extra' };
      checkTargetObject(t3);

      // Check that it allows booleans, numbers, strings, and arrays
      checkTargetObject('a');
      checkTargetObject(100);
      checkTargetObject(true);
      checkTargetObject(false);
      checkTargetObject('false');
      checkTargetObject([1, 2, 3]);
    });

    it('should throw an error parsing an empty value', () => {
      // Check that it rejects false-y empty input values
      expect(() => anyParsers.parseAny(null)).to.throw(error);
      expect(() => anyParsers.parseAny(undefined)).to.throw(error);

      // Check that it rejects complex object-like values
      expect(() => anyParsers.parseAny(Number('a'))).to.throw(error);

      const fn = () => (100);
      expect(() => anyParsers.parseAny(fn)).to.throw(error);

      const regexp = new RegExp('\\w+');
      expect(() => anyParsers.parseAny(regexp)).to.throw(error);
    });
  });

  describe('parseOptionalAny', () => {
    it('should parse and return an arbitrary data value', () => {
      function checkTargetObject(obj) {
        const result = anyParsers.parseOptionalAny(obj);
        expect(result).to.deep.equal(obj);
      }

      // Check that it properly parses objects with expected keys
      const t1 = { id: 'test.id', key: 'something' };
      checkTargetObject(t1);

      const t2 = { id: ' some other item ', key: '-another-' };
      checkTargetObject(t2);

      const t3 = { id: 'user-id1', other: 100, key: 'extra' };
      checkTargetObject(t3);

      // Check that it allows false-y empty input values
      expect(anyParsers.parseOptionalAny(null)).to.equal(undefined);
      checkTargetObject(undefined);

      // Check that it allows booleans, numbers, strings, and arrays
      checkTargetObject('a');
      checkTargetObject(100);
      checkTargetObject(true);
      checkTargetObject(false);
      checkTargetObject('false');
      checkTargetObject([1, 2, 3]);
    });

    it('should throw an error parsing an empty value', () => {
      // Check that it rejects complex object-like values
      expect(() => anyParsers.parseOptionalAny(Number('a'))).to.throw(error);

      const fn = () => (100);
      expect(() => anyParsers.parseOptionalAny(fn)).to.throw(error);

      const regexp = new RegExp('\\w+');
      expect(() => anyParsers.parseOptionalAny(regexp)).to.throw(error);
    });
  });
});
