import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from 'src/app/Interfaces/ProductInterface';
import { ResponseMessage } from 'src/app/Interfaces/responseMessage';
import { SearchedByCategory } from 'src/app/Interfaces/searchedByCategoryInterface';
import { SearchedProduct } from 'src/app/Interfaces/searchedProduct';
import { SearchedProductByCount } from 'src/app/Interfaces/SearchedProductInterface';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css']
})
export class SearchPageComponent {
  fruits = [
    'Apple',
    'Banana',
    'Cherry',
    'Date',
    'Elderberry',
    'Fig',
    'Grape',
    'Lemon',
    'Mango',
    'Orange',
    'Papaya',
    'Strawberry',
  ];
  
  displayedCards: any[] = [];
  translateValue = 0;
  cardWidth = 0; // Add the cardWidth property

  @ViewChild('cardContainer') cardContainer!: ElementRef;


  cards = [
    {
      title: 'Card 1',
      description: 'This is the description for card 1.'
    },
    {
      title: 'Card 2',
      description: 'This is the description for card 2.'
    },
    {
      title: 'Card 2',
      description: 'This is the description for card 2.'
    },
    {
      title: 'Card 2',
      description: 'This is the description for card 2.'
    },
    {
      title: 'Card 2',
      description: 'This is the description for card 2.'
    },
    {
      title: 'Card 2',
      description: 'This is the description for card 2.'
    },
    {
      title: 'Card 2',
      description: 'This is the description for card 2.'
    },
    {
      title: 'Card 2',
      description: 'This is the description for card 2.'
    },
    {
      title: 'Card 2',
      description: 'This is the description for card 2.'
    },
    {
      title: 'Card 2',
      description: 'This is the description for card 2.'
    },
    {
      title: 'Card 2',
      description: 'This is the description for card 2.'
    },
    {
      title: 'Card 2',
      description: 'This is the description for card 2.'
    },
    // Add more card objects as needed
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
    this.fetchDataFromApi() 
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
// Slider navigation

ngAfterViewInit() {
  this.updateDisplayedCards();
}

slide(direction: 'next' | 'prev') {
  const cardContainerElement = this.cardContainer.nativeElement;
  const cardElements = cardContainerElement.querySelectorAll('.card');
  this.cardWidth = cardElements.length > 0 ? cardElements[0].clientWidth : 0;

  const containerWidth = cardContainerElement.clientWidth;
  const visibleCards = 3;
  const maxTranslateValue = (this.cardWidth * this.cards.length) - (this.cardWidth * visibleCards);

  if (direction === 'next') {
    this.translateValue -= this.cardWidth * visibleCards;
    if (this.translateValue < -maxTranslateValue) {
      this.translateValue = -maxTranslateValue;
    }
  } else if (direction === 'prev') {
    this.translateValue += this.cardWidth * visibleCards;
    if (this.translateValue > 0) {
      this.translateValue = 0;
    }
  }

  cardContainerElement.style.transform = `translateX(${this.translateValue}px`; // Update the transform value

  this.updateDisplayedCards();
}

updateDisplayedCards() {
  const startIndex = Math.abs(Math.floor(this.translateValue / this.cardWidth));
  this.displayedCards = this.cards.slice(startIndex, startIndex + 3);
}
}



