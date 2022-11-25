import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products/products.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { CreateProductComponent } from './create-product/create-product.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        ProductsComponent,
        ProductDetailComponent,
        CreateProductComponent,
        EditProductComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule.forChild([
            { path: 'products', component: ProductsComponent },
            { path: 'details/:id', component: ProductDetailComponent },
            { path: 'create', component: CreateProductComponent },
            { path: 'edit/:id', component: EditProductComponent }
        ])
    ]
})
export class ProductModule { }