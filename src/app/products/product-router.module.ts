import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductDetailComponent } from './product-detail.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { ProductListComponent } from './product-list.component';
import { ProductResolver } from './product.resolver';

const routes: Routes = [
  {
    path: 'products',
    component: ProductListComponent
  },
  {
    path: 'products/:id',
    component: ProductDetailComponent,
    resolve: {
      resolvedProduct: ProductResolver
    }
  },
  {
    path: 'products/:id/edit',
    component: ProductEditComponent,
    resolve: {
      resolvedProduct: ProductResolver
    }
  }
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class ProductRouterModule { }
