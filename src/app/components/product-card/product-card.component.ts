import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit{

  cartCount!: number;
  products: {
    product: Product,
    quantity: number
  }[] = [];
  subscription!: Subscription;
  totalPrice: number = 0;
  selectQuantity: number = 1;

  @Input() productInfo!: Product;
  counter = Array;

  constructor(private productService: ProductService) { }
  
  ngOnInit(): void {
    this.subscription = this.productService.getCart().subscribe(
      (cart) => {
        this.cartCount = cart.cartCount;
        this.products = cart.products;
        this.totalPrice = cart.totalPrice;
      }
    );
    
    if (this.productInfo.quantity == 0){
      this.selectQuantity = 0;
    }

    console.log(this.counter(this.productInfo.quantity));
  }

  addToCart(product: Product, quantity: number): void {

    quantity = Number(quantity);
    let inCart = false;

    this.products.forEach(
      (element) => {
        console.log("TESTING")
        console.log(element)
        console.log(quantity)
        if(element.product == product){
          element.quantity += quantity;
          let cart = {
            cartCount: this.cartCount + quantity,
            products: this.products,
            totalPrice: this.totalPrice + product.price
          };
          this.productService.setCart(cart);
          inCart=true;
          return;
        };
      }

      
    );

    if(inCart == false){
      console.log(quantity)
      let newProduct = {
        product: product,
        quantity: quantity
      };
      this.products.push(newProduct);
      let cart = {
        cartCount: this.cartCount + quantity,
        products: this.products,
        totalPrice: this.totalPrice + product.price
      }
      this.productService.setCart(cart);
    }
      
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
