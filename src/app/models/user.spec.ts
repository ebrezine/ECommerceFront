import { User } from './user';

describe('User', () => {
  it('should create an instance', () => {
    expect(new User(1, "joewham14@gmail.com","Joey","Wham","password","What is your favorite color?","red")).toBeTruthy();
  });
});
