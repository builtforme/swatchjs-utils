const { expect } = require('chai');
const swatch = require('..');

describe('index', () => {
  it('should be a function that creates the API model', (done) => {
    expect(swatch).to.be.a('function');
    done();
  });
});
