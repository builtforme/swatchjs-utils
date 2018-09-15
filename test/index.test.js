const { expect } = require('chai');

const utils = require('..');

describe('index', () => {
  it('should be an empty object with utility packages', () => {
    expect(utils).to.deep.equal({});
  });
});
