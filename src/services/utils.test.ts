import {prepareFullName} from "./utils";

describe('#prepareFullName', () => {
  it('should correctly replace em and en dashes to regular dash', () => {
    expect(prepareFullName('\u2013')).toEqual('-');
    expect(prepareFullName('\u2014')).toEqual('-');
  })
})
