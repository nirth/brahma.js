import chai, {expect} from 'chai';
import {metrics, logging, stressTest} from '../src/index';

describe('Api should', () => {
  it('have meter factory', () => expect(metrics).to.be.a('function'));
  it('have logging factory', () => expect(logging).to.be.a('function'));
  it('have stress test', () => expect(stressTest).to.be.a('function'));
});

describe('Metrics factory should', () => {
  it('produce meter function', () => {
    expect(metrics('dir')).to.be.a('function');
  });

  it('produce meter function that accepts at least two arguments', () => {
    expect(metrics('dir').length).to.equal(7);
  });
});

describe('Logging factory should', () => {
  it('produce log function', () => {
    expect(logging('dir')).to.be.a('function');
  });

  it('produce log function that accepts at least two arguments', () => {
    expect(logging('dir').length).to.equal(7);
  });
});
