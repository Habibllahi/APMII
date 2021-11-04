import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Product } from './product';
import { ProductService } from './product.service';

@Component({
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit, OnDestroy {
  pageTitle = 'Product Detail';
  product!: Product;
  errorMessage!: string;
  routeSub!: Subscription
  productSub!: Subscription

  constructor(private productService: ProductService, private activatedRoute: ActivatedRoute,
     private route: Router) { }

  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
    this.productSub.unsubscribe()
  }

  ngOnInit(): void {
    this.getActivatedRouteParameter()
  }

  getProduct(id: number): void {
    this.productService.getProduct(id).subscribe({
      next: product => this.onProductRetrieved(product),
      error: err => this.errorMessage = err
    });
  }

  onProductRetrieved(product: Product): void {
    this.product = product;

    if (this.product) {
      this.pageTitle = `Product Detail: ${this.product.productName}`;
    } else {
      this.pageTitle = 'No product found';
    }
  }

  getActivatedRouteParameter(){
    this.routeSub = this.activatedRoute.paramMap.subscribe(
      (param) => {
        this.productSub = this.productService.getProduct(Number(param.get("id"))).subscribe(
          (product)=>{
            this.product = product;
          },
          (error: Error)=>{
            console.log(error.message);

          },
          ()=>{
            console.info("completed listening to route parameter from product details")
          }
        );
      },
      (error: Error)=>{
        console.log(error.message);

      },
      ()=>{
        console.info("completed getting product")
      }
    )
  }

}
