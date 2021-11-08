import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { Product } from './product';
import { ProductService } from './product.service';

@Component({
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  pageTitle = 'Product List';
  imageWidth = 50;
  imageMargin = 2;
  showImage = false;
  errorMessage = '';
  private _listFilter = '';
    filteredProducts: Product[] = [];
  products: Product[] = [];

  public get listFilter(): string {
    return this._listFilter;
  }
  public set listFilter(value: string) {
    this._listFilter = value;
    this.filteredProducts = this.listFilter ? this.performFilter(this.listFilter) : this.products;
  }
  constructor(private productService: ProductService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.getResolvedProducts();
    this.showImageBaseOnQueryParam();
    this.listFilterBaseOnQueryParam();
  }

  performFilter(filterBy: string): Product[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.products.filter((product: Product) => product.productName.toLocaleLowerCase().indexOf(filterBy) !== -1);
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

  public getResolvedProducts(): void {
    const data = this.activatedRoute.snapshot.data['resolvedProducts'];
    if(data.error){
      this.errorMessage = data.error;
    }else{
      this.products = data.products;
      this.filteredProducts = this.products;

    }
  }

}
