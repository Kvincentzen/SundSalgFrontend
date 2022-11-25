import { Router } from '@angular/router';
import { Product } from './../../_interfaces/product.model'
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RepositoryService } from '../../shared/services/repository.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {
  productForm: FormGroup;
  product: Product;
  errorMessage: string = '';
  showError: boolean;

  constructor(
    private repository: RepositoryService, 
    private router: Router) { }

  ngOnInit(): void {
    this.productForm = new FormGroup({
      name: new FormControl(''),
      price: new FormControl(''),
      desc: new FormControl('')
    });
  }
  public createProduct = (productFormValue) => {
    const formValues = { ...productFormValue };
    const product: Product = {
      name: formValues.name,
      price: formValues.price,
      desc: formValues.desc,
      picture: formValues.picture
    };
    this.repository.createProduct("api/product/create", product)
    .subscribe({
      next: (_) => this.router.navigate(["/product/products"]),
      error: (err: HttpErrorResponse) => {
        this.errorMessage = err.message;
        this.showError = true;
      }
    })
  }
}
