import { NgModule } from '@angular/core';

import { ProductListComponent } from './product-list.component';
import { ProductDetailComponent } from './product-detail.component';
import { ProductEditComponent } from './product-edit/product-edit.component';

import { SharedModule } from '../shared/shared.module';
import { ProductRouterModule } from './product-router.module';

@NgModule({
  imports: [
    SharedModule,
    ProductRouterModule
  ],
  declarations: [
    ProductListComponent,
    ProductDetailComponent,
    ProductEditComponent
  ]
})
export class ProductModule { }
