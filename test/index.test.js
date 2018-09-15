const { expect } = require('chai');

const utils = require('..');

describe('index', () => {
  it('should be an object with utility packages', () => {
    expect(utils).to.have.all.keys('api');
  });
});
