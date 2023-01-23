import { Address } from './address';

describe('Address', () => {
  it('should create an instance', () => {
    expect(new Address("Joey","Wham","123 Road Lane","None","Middletown","Texas","12345","US")).toBeTruthy();
  });
});
