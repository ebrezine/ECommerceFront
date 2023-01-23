import { Product } from './product';

describe('Product', () => {
  it('should create an instance', () => {
    expect(new Product(1,"shirt",5,"A fitting shirt for you",29.99,"https://www.rei.com/media/product/163975")).toBeTruthy();
  });
});
