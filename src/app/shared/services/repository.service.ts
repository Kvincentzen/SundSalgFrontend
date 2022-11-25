import { Product } from './../../_interfaces/product.model';
import { Counselor } from './../../_interfaces/counselor.model';
import { UserProfile } from 'src/app/_interfaces/user/userProfileDto.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; 
import { EnvironmentUrlService } from './environment-url.service';
import { UserForAuthenticationDto } from 'src/app/_interfaces/user/userForAuthenticationDto.model';

@Injectable({
  providedIn: 'root'
})
export class RepositoryService {

  constructor(private http: HttpClient, private envUrl: EnvironmentUrlService) { }

  public getProductsData = (route: string) => {
    return this.http.get<Product[]>(this.createCompleteRoute(route, this.envUrl.urlAddress));
  }
  public getProductData = (route: string) => {
    return this.http.get<Product>(this.createCompleteRoute(route, this.envUrl.urlAddress));
  }
  public createProduct = (route: string, product: Product) => {
    return this.http.post<Product>(this.createCompleteRoute(route, this.envUrl.urlAddress), product);
  }
  public editProductData = (route: string, product: Product) => {
    return this.http.put<Product>(this.createCompleteRoute(route, this.envUrl.urlAddress), product);
  }
  public deleteProductData = (route: string) => {
    return this.http.delete(this.createCompleteRoute(route, this.envUrl.urlAddress));
  }
  public getCounselorsData = (route: string) => {
    return this.http.get<Counselor[]>(this.createCompleteRoute(route, this.envUrl.urlAddress));
  }
  public getCounselorData = (route: string) => {
    return this.http.get<Counselor>(this.createCompleteRoute(route, this.envUrl.urlAddress));
  }
  public getProfileData = (route: string) => {
    return this.http.get<UserProfile>(this.createCompleteRoute(route, this.envUrl.urlAddress));
  }
  public getClaims = (route: string) => {
    return this.http.get(this.createCompleteRoute(route, this.envUrl.urlAddress));
  }
 
  private createCompleteRoute = (route: string, envAddress: string) => {
    return `${envAddress}/${route}`;
  }
}