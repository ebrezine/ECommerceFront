import { ProductDetails } from './product-details';

describe('ProductDetails', () => {
  it('should create an instance', () => {
    expect(new ProductDetails(1, 'Apple', 'iPhone', 'Green', '2.5 lbs', 'Apple')).toBeTruthy();
  });
});
