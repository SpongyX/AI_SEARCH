import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, throwError } from 'rxjs';
import { ResponseMessage } from '../Interfaces/responseMessage';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  
  toastrAlertService: any;
  constructor( private http: HttpClient,
    private router: Router,) { }

    public post(url: string, params: any = null): Observable<ResponseMessage> {
      return this.http.post(url, params).pipe(
        map((response: Object) => response as ResponseMessage),
        catchError((err, caught) => {
          switch (err.status) {
            case 0: {
              // this.toastrAlertService.errorToastr(("cannotConnectToTheService"));
              break;
            }
            case 401: {
              // this.toastrAlertService.errorToastr(("sessionExpired"));
              
              break;
            }
            case 404: {
              // this.toastrAlertService.errorToastr(("requestNotFound"));
              break;
            }
            case 412:
            case 500: {
              // this.toastrAlertService.errorToastr(("generalError"));
              break;
            }
          }
          return throwError(err);
        })
      );
    }
    public get(url: string, param: any = null): Observable<ResponseMessage> {
      return this.http.get<ResponseMessage>(url, { params: param })
          .pipe(
              map((response: ResponseMessage) => {
                  return response;
              }),
              catchError((err, caught) => {
                  switch (err.status) {
                      case 0: {
                        //  this.toastrAlertService.errorToastr(("cannotConnectToTheService"));
                          break;
                      }
                      case 401: {
                        //  this.toastrAlertService.errorToastr(("sessionExpired"));
                       
                          break;
                      }
                      case 404: {
                        //  this.toastrAlertService.errorToastr(("requestNotFound"));
                          break;
                      }
                      case 412:
                      case 500: {
                        // this.toastrAlertService.errorToastr(("generalError"));
                          break;
                      }
                  }
                  return throwError(err);
              }))
  }

  public delete(url: string, param: any = null): Observable<ResponseMessage> {
    return this.http.delete<ResponseMessage>(url, { params: param })
      .pipe(
        map((response: ResponseMessage) => {
          return response;
        }),
        catchError((err, caught) => {
          switch (err.status) {
            case 0: {
              this.toastrAlertService.errorToastr(("cannotConnectToTheService"));
              break;
            }
            case 401: {
              this.toastrAlertService.errorToastr(("sessionExpired"));
              break;
            }
            case 404: {
              this.toastrAlertService.errorToastr(("requestNotFound"));
              break;
            }
            case 412:
            case 500: {
              this.toastrAlertService.errorToastr(("generalError"));
              break;
            }
          }
          return throwError(err);
        })
      );
  }

  public put(url: string, params: any = null): Observable<ResponseMessage> {
    return this.http.put(url, params).pipe(
      map((response: Object) => response as ResponseMessage),
      catchError((err, caught) => {
        switch (err.status) {
          case 0: {
            this.toastrAlertService.errorToastr(("cannotConnectToTheService"));
            break;
          }
          case 401: {
            this.toastrAlertService.errorToastr(("sessionExpired"));
            break;
          }
          case 404: {
            this.toastrAlertService.errorToastr(("requestNotFound"));
            break;
          }
          case 412:
          case 500: {
            this.toastrAlertService.errorToastr(("generalError"));
            break;
          }
        }
        return throwError(err);
      })
    );
  }
}
