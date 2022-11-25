import { Product } from './../../_interfaces/product.model'
import { RepositoryService } from '../../shared/services/repository.service';
import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthenticationService } from './../../shared/services/authentication.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  public products: Product[];
  isUserAdmin: boolean;

  constructor(private authService: AuthenticationService, 
    private repository: RepositoryService, private router: Router) {
      this.authService.authChanged
      .subscribe(res => {
        this.isUserAdmin = res;
      })
     }

  ngOnInit(): void {
    this.authService.authChanged
    .subscribe(res => {
      this.isUserAdmin = res;
    });
    this.getProducts();
  }

  getProducts = () => {
    const apiAddress: string = "api/product";
    this.repository.getProductsData(apiAddress)
    .subscribe({
        next: (pro: Product[]) => this.products = pro,
        error: (err: HttpErrorResponse) => console.log(err)
    })
  }
  public getProductDetails = (id) => { 
    const detailsUrl: string = `/product/details/${id}`; 
    this.router.navigate([detailsUrl]);
  }
  createProduct = () => {

  }
}
