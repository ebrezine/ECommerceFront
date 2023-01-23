import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductDetails } from '../models/product-details';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ProductDetailsService {

  private productDetailsUrl: string = "/api/product/productDetails";

  constructor(private http: HttpClient) { }


  public getProductDetails(): Observable<ProductDetails[]> {
    return this.http.get<ProductDetails[]>(environment.baseUrl+this.productDetailsUrl, {headers: environment.headers, withCredentials: environment.withCredentials});
  }

}
