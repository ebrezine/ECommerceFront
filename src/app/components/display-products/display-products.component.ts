import { Component, Input, OnInit, Output } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-display-products',
  templateUrl: './display-products.component.html',
  styleUrls: ['./display-products.component.css']
})
export class DisplayProductsComponent implements OnInit {

  allProducts: Product[] = [];
  @Output() query: String = "";

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.fetchProducts(this.query)
  }

  search(query:String){
    this.fetchProducts(query);
  }

  fetchProducts(query:String){
    this.productService.getProducts(query).subscribe(
      (resp) => {
        this.allProducts = resp
      },
      (err) => console.log(err),
      () => {
        console.log("Products Retrieved")
      }
      
    );
  }


}
