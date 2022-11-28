import { Component, OnInit } from '@angular/core';
import { loadStripe } from '@stripe/stripe-js';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductPurchase } from '../_interfaces/productPurchase.model'
import { AuthenticationService } from './../shared/services/authentication.service';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.css']
})
export class SuccessComponent implements OnInit {
  productPurchase: ProductPurchase;

  constructor(
    private authService: AuthenticationService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    //const sessionId = this.route.snapshot.params['session_id'];
    const ses = this.router.url;
    const mA = ses.split("=");
    this.productPurchase.sessionId = mA[1];
    this.productPurchase.userName = this.authService.findProfile()
    console.log(this.productPurchase.userName);
    
  }

}
