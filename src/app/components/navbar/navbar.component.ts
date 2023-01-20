import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{

  cartCount!: number;
  subscription!: Subscription;

  constructor(private authService: AuthService, private router: Router, private productService: ProductService, route: ActivatedRoute) {
    route.params.subscribe(val => {
      this.subscription = this.productService.getCart().subscribe(
        (cart) => this.cartCount = cart.cartCount
      );
    })
   }
  
  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if(event instanceof NavigationEnd) {
        this.subscription = this.productService.getCart().subscribe(
          (cart) => this.cartCount = cart.cartCount
        );
      }
    })
    this.subscription = this.productService.getCart().subscribe(
      (cart) => this.cartCount = cart.cartCount
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['login']);
  }

}
