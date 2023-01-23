import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/product';
import { ProductDetails } from 'src/app/models/product-details';
import { ProductDetailsService } from 'src/app/services/product-details.service';
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
  inCart: boolean = false;


  isDetailsOn: boolean = false;
  detailsInfo: ProductDetails[] = [];


  @Input() productInfo!: Product;
  counter = Array;
  
  //static productDetailsService: ProductDetailsService;

  constructor(private productService: ProductService,
              private productDetailsService: ProductDetailsService) { }
  
  ngOnInit(): void {
    this.subscription = this.productService.getCart().subscribe(
      (cart) => {
        this.cartCount = cart.cartCount;
        this.products = cart.products;
        this.totalPrice = cart.totalPrice;
      }
    );

    this.checkCart();
    
    this.isDetailsOn = false;
    this.productDetailsService.getProductDetails().subscribe(
      (resp2) => this.detailsInfo = resp2,
      (err) => console.log(err),
      () => console.log(this.detailsInfo)
      
    );

  }

  checkCart(){

    for (let i = 0; i < this.products.length; i++){
      if (this.products[i].product.name == this.productInfo.name){
        this.productInfo.quantity -= this.products[i].quantity;
        this.inCart = true;
      }
    }


    if (this.productInfo.quantity == 0){
      this.selectQuantity = 0;
    }


    if (this.productInfo.quantity == 0){
      this.selectQuantity = 0;
    }

  }
  
  addToCart(product: Product, quantity: number): void {
    quantity = Number(quantity);
    let total = this.productInfo.quantity - quantity;

    this.productInfo.quantity -= quantity;

    if (this.productInfo.quantity == 0){
      this.selectQuantity = 0;
    }

    if (total < 0){
      this.productInfo.quantity += quantity
      quantity = 0;
      this.selectQuantity = 1;
    }

    this.products.forEach(
      (element) => {
        if(element.product.name == product.name){
          element.quantity += quantity;
          let cart = {
            cartCount: this.cartCount + quantity,
            products: this.products,
            totalPrice: this.totalPrice + product.price*quantity
          };
          this.productService.setCart(cart);
          this.inCart=true;
          return;
        };
      }

      
    );

    if(this.inCart == false){
      let newProduct = {
        product: product,
        quantity: quantity
      };
      this.products.push(newProduct);
      let cart = {
        cartCount: this.cartCount + quantity,
        products: this.products,
        totalPrice: this.totalPrice + product.price*quantity
      }
      this.productService.setCart(cart);
    }
      
  }

  
  detailsViewOn(): void {
    this.isDetailsOn = true;      
  }

  detailsViewOff(): void {
  this.isDetailsOn = false;
  }
  
  
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
