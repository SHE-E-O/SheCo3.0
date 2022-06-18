import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',

  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  currentCategoryId: number = 1;
  previousCategoryId: number = 1;
  searchMode: boolean = false;

  thePageNumber: number = 1;
  thePageSize: number = 10;
  theTotalElements: number = 0;
  
  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    });
  }
 
  listProducts(){
    this.searchMode = this.route.snapshot.paramMap.has('keyword');
    if(this.searchMode){
      this.handleSearchProducts();
    }else{
      this.handleListProducts();
    }

    
  }


    handleSearchProducts(){
      const theKeyword: string = this.route.snapshot.paramMap.get('keyword');

      //search for products by keyword

      this.productService.searchProducts(theKeyword).subscribe(
        data => {
          this.products = data;
        }
      );

    }

    handleListProducts(){
      // check if id parameter is availabale
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id')
    if (hasCategoryId) {
      // get the id param string. convert to a number using the "+" symbol
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id');
    }
    else{
      this.currentCategoryId =1;
    }
    



if(this.previousCategoryId != this.currentCategoryId){
  this.thePageNumber = 1;
}

this.previousCategoryId = this.currentCategoryId;

console.log(`currrentCategoryId=${this.currentCategoryId}, thePageNumber=${this.thePageNumber}`);



    this.productService.getProductListPaginate(this.thePageNumber - 1,
      this.thePageSize, this.currentCategoryId).subscribe(this.processResult());
    }

    processResult(){
      return (data: { _embedded: { products: Product[]; }; page: { number: number; size: number; totalElements: number; }; }) => {
        this.products = data._embedded.products;
        this.thePageNumber = data.page.number + 1;
        this.thePageSize = data.page.size;
        this.theTotalElements = data.page.totalElements;
      } ;
    }


    addToCart(theProduct: Product){
      console.log(`Adding to cart: ${theProduct.name}, ${theProduct.unitPrice}`)

      // TODO the real work
      
    }
}
