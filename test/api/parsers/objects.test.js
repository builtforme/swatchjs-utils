const { expect } = require('chai');

const errors = require('../../../lib/errors');
const objectParsers = require('../../../lib/api/parsers/objects');

const error = errors.ERROR_CODE_INVALID_OBJECT;

describe('parsers.objects', () => {
  describe('parseObject', () => {
    it('should parse and return a serialized JSON document', () => {
      function checkTargetObject(obj) {
        const result = objectParsers.parseObject(obj);
        expect(result).to.deep.equal(obj);
      }

      // Check that it properly parses objects with expected keys
      const t1 = { id: 'test.id', key: 'something' };
      checkTargetObject(t1);

      const t2 = { id: ' some other item ', key: '-another-' };
      checkTargetObject(t2);

      const t3 = { id: 'user-id1', other: 100, key: 'extra' };
      checkTargetObject(t3);
    });

    it('should throw an error parsing a non-dict object', () => {
      // Check that it rejects false-y input values
      expect(() => objectParsers.parseObject(null)).to.throw(error);
      expect(() => objectParsers.parseObject(undefined)).to.throw(error);

      // Check that it rejects values that are not objects
      expect(() => objectParsers.parseObject('a')).to.throw(error);
      expect(() => objectParsers.parseObject(100)).to.throw(error);
      expect(() => objectParsers.parseObject(true)).to.throw(error);
      expect(() => objectParsers.parseObject(false)).to.throw(error);
      expect(() => objectParsers.parseObject('false')).to.throw(error);

      // Check that it rejects complex object-like values
      expect(() => objectParsers.parseObject([1, 2, 3])).to.throw(error);

      const fn = () => (100);
      expect(() => objectParsers.parseObject(fn)).to.throw(error);

      const regexp = new RegExp('\\w+');
      expect(() => objectParsers.parseObject(regexp)).to.throw(error);
    });
  });
});
