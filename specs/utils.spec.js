import chai, {expect} from 'chai';
import {
  expired,
  newLine
} from '../src/utils';

describe('Utility newLine should', () => {
  it('exist', () => expect(newLine).to.be.a('function'));
  it('get newline for linux', () => expect(newLine('linux')).to.equal('\n'));
  it('get newline for mac', () => expect(newLine('darwin')).to.equal('\n'));
  it('get newline for windows', () => {
    expect(newLine('windows_nt')).to.equal('\r\n');
  });
});

describe('Utility expired should', () => {
  const MINUTE = 60000;
  const TEN_MINUTES = 600000;
  let moreThanMinuteAgo, almostMinuteAgo;
  let moreThanTenMinutesAgo, almostTenMinutesAgo;

  beforeEach(() => {
    moreThanMinuteAgo = Date.now() - (MINUTE + 10);
    almostMinuteAgo = Date.now() - (MINUTE - 10);
    moreThanTenMinutesAgo = Date.now() - (TEN_MINUTES + 10);
    almostTenMinutesAgo = Date.now() - (TEN_MINUTES - 10);
  });

  it('exist', () => expect(expired).to.be.a('function'));
  it('identify if item is expired', () => {
    expect(expired(moreThanMinuteAgo, MINUTE)).to.equal(true);
    expect(expired(moreThanTenMinutesAgo, TEN_MINUTES)).to.equal(true);
  });

  it('identify if item is not expired', () => {
    expect(expired(almostMinuteAgo, MINUTE)).to.equal(false);
    expect(expired(almostTenMinutesAgo, TEN_MINUTES)).to.equal(false);
  });
});
