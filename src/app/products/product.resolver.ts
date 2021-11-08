import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ProductResolved } from './product';
import { ProductService } from './product.service';

@Injectable({
  providedIn: 'root'
})
export class ProductResolver implements Resolve<ProductResolved>{

  productR: ProductResolved = {
    product: undefined,
    error: undefined
  }
  constructor(private productService: ProductService){}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ProductResolved> {
    let id = Number(route.paramMap.get('id'));
    if(isNaN(id)){
      this.productR.product = undefined;
      this.productR.error = "product id not a number";
      return of(this.productR);
    }else{
      return this.productService.getProduct(id).pipe(
        map(product => {
        this.productR.product = product;
        this.productR.error = undefined;
        return this.productR;
        }),
        catchError((error, caught) => {
        this.productR.product = undefined;
        this.productR.error = `Retrieval error: ${error}`;
        return of(this.productR);
        })
      );
    }

  }

}
