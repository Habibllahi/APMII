import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Product } from './product';
import { ProductService } from './product.service';

@Component({
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  pageTitle = 'Product Detail';
  product!: Product;
  errorMessage!: string;

  constructor(private productService: ProductService, private activatedRoute: ActivatedRoute,
     private route: Router) { }

  ngOnInit(): void {
    this.getResolvedProduct()
  }

  public getResolvedProduct(){
    const resolvedData = this.activatedRoute.snapshot.data['resolvedProduct'];
    if(resolvedData.error){
      this.errorMessage = resolvedData.error
    }else{
      this.pageTitle = resolvedData.product.productName;
      this.product = resolvedData.product;
    }
  }

}
