import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ProductListResolved } from './product';
import { ProductService } from './product.service';

@Injectable({
  providedIn: 'root'
})
export class ProductListResolver implements Resolve<ProductListResolved> {
  productsListResolved : ProductListResolved = {
    products: undefined,
    error: undefined
  }

  constructor(private productService: ProductService){}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ProductListResolved> {
    return this.productService.getProducts().pipe(map(products => {
      this.productsListResolved.products = products;
      this.productsListResolved.error = undefined;
      return this.productsListResolved;
      }),
      catchError((error)=>{
      this.productsListResolved.products = undefined;
      this.productsListResolved.error = `unable to fetch products, reason: ${error}`
      return of(this.productsListResolved);
      })
    );
  }
}
