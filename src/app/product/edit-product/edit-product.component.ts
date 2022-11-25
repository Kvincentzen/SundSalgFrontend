import { Router, ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../shared/services/authentication.service';
import { RepositoryService } from '../../shared/services/repository.service';
import { Product } from './../../_interfaces/product.model'
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  editProductForm: FormGroup;
  product: Product;
  errorMessage: string = '';
  showError: boolean;

  constructor(
    private authService: AuthenticationService, 
    private router: Router,
    private repository: RepositoryService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.editProductForm = new FormGroup({
      name: new FormControl(''),
      price: new FormControl(''),
      desc: new FormControl('')
    });
    this.getProduct();
  }
  getProduct = () => {
    const id: string = this.route.snapshot.params['id'];
    const apiAddress: string = `api/product/${id}`;
    this.repository.getProductData(apiAddress)
    .subscribe({
        next: (con: Product) => this.product = con,
        error: (err: HttpErrorResponse) => console.log(err)
    })
  }
  public editProduct = (editFormValue) => {
    const paramId: number = this.route.snapshot.params['id'];
    const formValues = { ...editFormValue };
    const product: Product = {
      id: paramId,
      name: formValues.name,
      price: formValues.price,
      desc: formValues.desc,
      picture: ""
    };
    this.repository.editProductData("api/product/update", product)
    .subscribe({
      next: (_) => this.router.navigate([`/product/details/${paramId}`]),
      error: (err: HttpErrorResponse) => {
        this.errorMessage = err.message;
        this.showError = true;
      }
    })
  }
}
