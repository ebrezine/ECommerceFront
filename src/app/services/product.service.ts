import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../models/product';
import { environment } from 'src/environments/environment';

interface Cart {
  cartCount: number;
  products: {
    product: Product,
    quantity: number
  }[];
  totalPrice: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private productUrl: string = "/api/product";

  private _cart = new BehaviorSubject<Cart>({
    cartCount: 0,
    products: [],
    totalPrice: 0.00
  });

  private _cart$ = this._cart.asObservable();

  getCart(): Observable<Cart> {
    return this._cart$;
  }

  removeItem(id: number): number{
    for(let i = 0; i < this._cart.value.products.length; i++){
      if(this._cart.value.products[i].product.id == id){
        this._cart.value.totalPrice -= (this._cart.value.products[i].product.price);
        this._cart.value.cartCount-= (this._cart.value.products[i].quantity);
        this._cart.value.products.splice(i, 1);
        break;
      }
    }
    return this._cart.value.totalPrice;
  }

  setCart(latestValue: Cart) {
    return this._cart.next(latestValue);
  }

  


  constructor(private http: HttpClient) { }

  public getProducts(query:String): Observable<Product[]> {
    
    if(!query){
      return this.http.get<Product[]>(environment.baseUrl+this.productUrl, {headers: environment.headers, withCredentials: environment.withCredentials});
    }
    else{
      return this.http.get<Product[]>(environment.baseUrl+this.productUrl+`?query=${query}`, {headers: environment.headers, withCredentials: environment.withCredentials});
    }
  }

  public getSingleProduct(id: number): Observable<Product> {
    return this.http.get<Product>(environment.baseUrl+id);
  }

  public purchase(products: {id:number, quantity:number}[]): Observable<any> {
    const payload = JSON.stringify(products);
    return this.http.patch<any>(environment.baseUrl+this.productUrl, payload, {headers: environment.headers, withCredentials: environment.withCredentials})
  }
}
