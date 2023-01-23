import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { Product } from 'src/app/models/product';
import { ProductDetails } from 'src/app/models/product-details';
import { ProductService } from 'src/app/services/product.service';

import { ProductCardComponent } from './product-card.component';

describe('ProductCardComponent', () => {
  let component: ProductCardComponent;
  let fixture: ComponentFixture<ProductCardComponent>;
  let product1 = new Product(1, "Pencil", 5, "Is a mocked product object pencil", 2, 'https://www.pngarts.com/files/3/Women-Jacket-PNG-High-Quality-Image.png');
  
  const provideServiceStub = {
    getCart() {
      
      const cart = ({
        cartCount: 0,
        products: [],
        totalPrice: 0.00
      })
      
      return of(cart)
    }
  }

//   {product:{
//     id : 2,
//     name : "Shoes",
//     quantity : 80,
//     description : "A pair of shoes",
//     price : 150,
//     image : 'image'
// }, quantity:80}

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductCardComponent ],
      imports: [HttpClientModule, FormsModule],
      providers: [{provide: ProductService, useValue:provideServiceStub}]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductCardComponent);
    component = fixture.componentInstance;
    component.productInfo = product1
    // component.products = [{product:product1, quantity:product1.quantity}]
    fixture.detectChanges();
  });

  it("check component products", async()=>{
    expect(component.products).toBeTruthy();
  })

  it('should create', async() => {
    expect(component).toBeTruthy();
  });

  it("should add disabled button if select quantity is 0", async()=>{
    component.selectQuantity = 0;
    fixture.detectChanges();
    const btn = fixture.debugElement.nativeElement.querySelector('#addCart');
    expect(btn.getAttribute('disabled')).toBe('');
  })
  // it('should get cart', () => {
  //   spyOn(component, 'getCart' as never);
  // })

  // it('should return product details', async()=>{
  //   let testDetailsInfo: ProductDetails[]=[];
  //   ProductCardComponent.productDetailsService.getProductDetails().subscribe(
  //     (resp2) => testDetailsInfo = resp2,
  //     (err) => console.log(err),
  //   )
  //   expect(testDetailsInfo).toBeTruthy();
  // });


});
