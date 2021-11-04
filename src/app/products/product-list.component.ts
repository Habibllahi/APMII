import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { Product } from './product';
import { ProductService } from './product.service';

@Component({
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {
  pageTitle = 'Product List';
  imageWidth = 50;
  imageMargin = 2;
  showImage = false;
  errorMessage = '';
  sub !: Subscription
  private _listFilter = '';

  public get listFilter(): string {
    return this._listFilter;
  }
  public set listFilter(value: string) {
    this._listFilter = value;
    this.filteredProducts = this.listFilter ? this.performFilter(this.listFilter) : this.products;
  }

  filteredProducts: Product[] = [];
  products: Product[] = [];

  constructor(private productService: ProductService, private route: Router, private activatedRoute: ActivatedRoute) { }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  ngOnInit(): void {
    this.showImageBaseOnQueryParam();
    this.listFilterBaseOnQueryParam();
    this.sub = this.productService.getProducts().subscribe({
      next: products => {
        this.products = products;
        this.filteredProducts = this.performFilter(this.listFilter);
      },
      error: err => this.errorMessage = err
    });


  }

  performFilter(filterBy: string): Product[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.products.filter((product: Product) =>
      product.productName.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }

  toggleImage(): void {
    this.showImage = !this.showImage;
  }

  public showImageBaseOnQueryParam(){
    let imageWasShown: string | null = this.activatedRoute.snapshot.queryParamMap.get("showImage");
    if(imageWasShown){
      this.showImage = imageWasShown === "true"? true : false
    }
  }

  public listFilterBaseOnQueryParam(){
    let listFliter: string | null = this.activatedRoute.snapshot.queryParamMap.get("filterBy");
    if(listFliter){
      this.listFilter = listFliter
    }
  }

}
