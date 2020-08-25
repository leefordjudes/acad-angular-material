import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProductsService } from './products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html'
})
export class ProductsComponent implements OnInit, OnDestroy {
  productName = 'A Book';
  isDisabled = true;

  products = [];
  private productsSubscription: Subscription;

  constructor(private productsService: ProductsService){
    setTimeout(()=> {
      this.isDisabled = false;
    },3000);
  }
  ngOnDestroy(): void {
    this.productsSubscription.unsubscribe();
  }

  ngOnInit() {
    this.products = this.productsService.getProducts();
    this.productsSubscription = this.productsService.updatedProducts$.subscribe(() => {
      this.products = this.productsService.getProducts();
    });
  }

  onAddProduct(){
    this.products.push(this.productName);
  }

  onRemoveProdct(productName: string) {
    this.products = this.products.filter(p => p !== productName);
  }
  formAddProduct(form) {
    if(form.valid) {
      // this.products.push(form.value.pdtName);
      this.productsService.addProduct(form.value.pdtName);
    }
  }
}