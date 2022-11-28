import { Product } from '../../_interfaces/product.model'
import { Router, ActivatedRoute } from '@angular/router';
import { RepositoryService } from '../../shared/services/repository.service';
import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthenticationService } from '../../shared/services/authentication.service';
import { loadStripe } from '@stripe/stripe-js';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  product: Product;
  isUserAdmin: boolean;
  errorMessage: string = '';
  showError: boolean;
  bUrl: string = 'http://localhost:4200';
  stripePromise = loadStripe(environment.stripe_key);
  quantity = 1;

  constructor(
    private repository: RepositoryService,
    private authService: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute
    ) { 
      this.authService.authChanged
      .subscribe(res => {
        this.isUserAdmin = res;
      })
    }

  ngOnInit(): void {
    this.authService.authChanged
    .subscribe(res => {
      this.isUserAdmin = res;
    })
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
  async purchaseProduct() {
    const stripe = await this.stripePromise;
    const { error } = await stripe.redirectToCheckout({
      mode:'payment',
      lineItems: [{ price: this.product.priceId, quantity: this.quantity }],
      successUrl: `${this.bUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancelUrl: `${this.bUrl}/failure`,
    });
    if (error) {
      console.log(error);
    }
  }
  public editProduct = () => { 
    const editUrl: string = `/product/edit/${this.product.id}`;
    this.router.navigate([editUrl]); 
  }
  public deleteProduct = () => {
    const deleteUrl: string = `api/product/${this.product.id}`;
    this.repository.deleteProductData(deleteUrl)
    .subscribe({
      next: (_) => this.router.navigate(["/product/products"]),
      error: (err: HttpErrorResponse) => {
        this.errorMessage = err.message;
        this.showError = true;
      }
    })
  }
}