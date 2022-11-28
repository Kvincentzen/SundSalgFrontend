import { AdminGuard } from './shared/guards/admin.guard';
import { AuthGuard } from './shared/guards/auth.guard';
import { ErrorHandlerService } from './shared/services/error-handler.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { JwtModule } from "@auth0/angular-jwt";

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { MenuComponent } from './menu/menu.component';
import { NotFoundComponent } from './error-pages/not-found/not-found.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { SuccessComponent } from './success/success.component';
import { FailureComponent } from './failure/failure.component';
 
export function tokenGetter() {
  return localStorage.getItem("token");
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MenuComponent,
    NotFoundComponent,
    ForbiddenComponent,
    SuccessComponent,
    FailureComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CollapseModule.forRoot(),
    RouterModule.forRoot([
      { path: 'home', component: HomeComponent },
      { path: 'success', component: SuccessComponent },
      { path: 'failure', component: FailureComponent },
      { path: 'counselor', loadChildren: () => import('./counselor/counselor.module').then(m => m.CounselorModule) },
      { path: 'product', loadChildren: () => import('./product/product.module').then(m => m.ProductModule) },
      { path: 'authentication', loadChildren: () => import('./authentication/authentication.module').then(m => m.AuthenticationModule) },
      { path: '404', component : NotFoundComponent},
      { path: 'forbidden', component: ForbiddenComponent }
    ]),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["localhost:5000"],
        disallowedRoutes: []
      }
    })
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorHandlerService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }