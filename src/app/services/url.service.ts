import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class UrlService {

  ProductUrl: string = environment.DomainURL;

  constructor() { }
  
  //----------------- Search Action Urls --------------------------
  public GetProducts: string = this.ProductUrl + '/Product/GetProduct/';
  public SearchedProduct: string = this.ProductUrl + '/Product/GetProductByWord?ContainsWord=';
  public MostSearched: string = this.ProductUrl + '/Product/GetMostSearched/';
  public MostSearchedByCategory: string = this.ProductUrl + '/Product/GetByCategory/';
}
