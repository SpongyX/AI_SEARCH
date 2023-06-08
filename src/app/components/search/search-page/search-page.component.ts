import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from 'src/app/Interfaces/ProductInterface';
import { ResponseMessage } from 'src/app/Interfaces/responseMessage';
import { SearchedProduct } from 'src/app/Interfaces/searchedProduct';
import { SearchedProductByCount } from 'src/app/Interfaces/SearchedProductInterface';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css']
})
export class SearchPageComponent {
  searchedForm!: FormGroup;
  products!: Product[];
  searchedProductsByCount!: SearchedProductByCount[];
  // searchedWord!: SearchedProduct;
  constructor(private searchService: SearchService,
    private formBuilder: FormBuilder) {
      this.searchedForm = this.formBuilder.group({
        searchedWord: ['', Validators.required]
      });
    }
  
  ngOnInit(): void {
    this.fetchDataFromApi() 
    this.fetchByMostSearched()
  }
  // fetchAll products
  fetchDataFromApi() {
    this.searchService.getProducts().subscribe(
    
      (res) => {
        console.log(res)
        if(res.successed) {
          this.products = res.response
          console.log(this.products)
        }
      },
      error => {
        console.error(error);
      }
    );
  }
  // fetchby most count
  fetchByMostSearched() {
    this.searchService.getMostSearched().subscribe(
    
      (res) => {
        console.log(res)
        if(res.successed) {
          this.searchedProductsByCount = res.response
          console.log(this.searchedProductsByCount)
        }
      },
      error => {
        console.error(error);
      }
    );
  }

  // searched by word, if product description contain the word then we increment the count in the backend
  onSubmit() {
    if (this.searchedForm.valid) {
      const newWord: SearchedProduct = {
        searchedWord: this.searchedForm.value.searchedWord,
      };
      this.searchService.SearchedProduct(newWord).subscribe(
        (response: ResponseMessage) => {
          console.log(response)
         
        },
        (error: any) => {
          console.error(error);        }
      );
    } 
  }
  
}
