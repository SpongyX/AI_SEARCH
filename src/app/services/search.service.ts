import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseMessage } from '../Interfaces/responseMessage';
import { SearchedProduct } from '../Interfaces/searchedProduct';
import { HttpService } from './http.service';
import { UrlService } from './url.service';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private httpService: HttpService,
    private urlService: UrlService) { }

    getProducts(): Observable<ResponseMessage>{
      console.log(this.urlService.GetProducts)
      return this.httpService.get(this.urlService.GetProducts);
    }
    getMostSearched(): Observable<ResponseMessage>{
      return this.httpService.get(this.urlService.MostSearched);
    }
    SearchedProduct(searchedWord: SearchedProduct): Observable<ResponseMessage> {
      console.log( this.urlService.SearchedProduct + searchedWord);
      return this.httpService.post(this.urlService.SearchedProduct + searchedWord.searchedWord)
    }
}
