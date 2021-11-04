import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { MessageService } from '../../messages/message.service';

import { Product } from '../product';
import { ProductService } from '../product.service';

@Component({
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit, OnDestroy {
  pageTitle = 'Product Edit';
  errorMessage!: string;

  product!: Product;

  routeSub!: Subscription;

  productSub!: Subscription

  constructor(private productService: ProductService,
              private messageService: MessageService, private activatedRoute: ActivatedRoute,
              private route: Router) { }
  ngOnInit(): void {
    this.getActivatedRouteParameter();
  }
  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
    this.productSub.unsubscribe();
  }

  getProduct(id: number): void {
    this.productService.getProduct(id).subscribe({
      next: product => this.onProductRetrieved(product),
      error: err => this.errorMessage = err
    });
  }

  onProductRetrieved(product: Product): void {
    this.product = product;

    if (!this.product) {
      this.pageTitle = 'No product found';
    } else {
      if (this.product.id === 0) {
        this.pageTitle = 'Add Product';
      } else {
        this.pageTitle = `Edit Product: ${this.product.productName}`;
      }
    }
  }

  deleteProduct(): void {
    if (this.product.id === 0) {
      // Don't delete, it was never saved.
      this.onSaveComplete(`${this.product.productName} was deleted`);
    } else {
      if (confirm(`Really delete the product: ${this.product.productName}?`)) {
        this.productService.deleteProduct(this.product.id).subscribe({
          next: () => this.onSaveComplete(`${this.product.productName} was deleted`),
          error: err => this.errorMessage = err
        });
      }
    }
    this.route.navigate(['/products'])
  }

  saveProduct(): void {
    if (true === true) {
      if (this.product.id === 0) {
        this.productService.createProduct(this.product).subscribe({
          next: () => this.onSaveComplete(`The new ${this.product.productName} was saved`),
          error: err => this.errorMessage = err
        });
      } else {
        this.productService.updateProduct(this.product).subscribe({
          next: () => this.onSaveComplete(`The updated ${this.product.productName} was saved`),
          error: err => this.errorMessage = err
        });
      }
    } else {
      this.errorMessage = 'Please correct the validation errors.';
    }
    this.route.navigate(['/products'])
  }

  onSaveComplete(message?: string): void {
    if (message) {
      this.messageService.addMessage(message);
    }

    // Navigate back to the product list
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
