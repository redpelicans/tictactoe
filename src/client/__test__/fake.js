import chai from 'chai';

const { describe, it } = global;
const { expect } = chai;

describe('Check Sum', () => {
  it('1+1 == 2', () => {
    const res = 1 + 1;
    expect(res).to.equal(2);
  });
});
