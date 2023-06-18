import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from 'src/app/Interfaces/ProductInterface';
import { ResponseMessage } from 'src/app/Interfaces/responseMessage';
import { SearchedByCategory } from 'src/app/Interfaces/searchedByCategoryInterface';
import { SearchedProduct } from 'src/app/Interfaces/searchedProduct';
import { SearchedProductByCount } from 'src/app/Interfaces/SearchedProductInterface';
import { SearchService } from 'src/app/services/search.service';
import { SlickCarouselModule } from 'ngx-slick-carousel';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css']
})
export class SearchPageComponent  {
  slides = [
    { title: 'Slide 1', description: 'This is the first slide' },
    { title: 'Slide 2', description: 'This is the second slide' },
    { title: 'Slide 3', description: 'This is the third slide' },
    // Add more slides as needed
  ];
  searchedForm!: FormGroup;

  products!: Product[];
  searchedProductsByCount!: SearchedProductByCount[];
  searchedByCategory!: SearchedByCategory[];
  // searchedWord!: SearchedProduct;
  constructor(private searchService: SearchService,
    private formBuilder: FormBuilder) {
      this.searchedForm = this.formBuilder.group({
        searchedWord: ['', Validators.required]
      });
  
    }

  ngOnInit(): void {
    //this.fetchDataFromApi() 
    //this.fetchByMostSearched()

    
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

  //get by category

  getByCategory(){
    this.searchService.SearchedByCategory().subscribe(
      (res) => {
        if(res.successed){
          this.searchedByCategory = res.response
          console.log(this.searchedByCategory)
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


  
selectedOption: string = ''; 
toggleData(): void {
  if (this.selectedOption === 'products') {
    this.fetchDataFromApi();
  } else if (this.selectedOption === 'searchedProductsByCount') {
    this.fetchByMostSearched();
  }
  else if (this.selectedOption === 'searchedByCategory') {
    this.getByCategory();
  }
}



}



