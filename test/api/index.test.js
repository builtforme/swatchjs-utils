const { expect } = require('chai');

const api = require('../../lib/api');

describe('api', () => {
  it('should be an object with packages', () => {
    expect(api).to.have.all.keys('parsers', 'validators');
  });
});
