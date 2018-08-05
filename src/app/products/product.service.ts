import { Injectable } from '@angular/core';
import { IProduct } from './product';
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Observable, throwError } from 'rxjs'
import { tap,catchError } from 'rxjs/operators'


@Injectable({
	providedIn: 'root'
})
export class ProductService{

  private productUrl:string = 'assets/products.json';

  constructor(private http: HttpClient){

  }
	getProducts() : Observable<IProduct[]> {
		return this.http.get<IProduct[]>(this.productUrl).pipe(
      tap(data => console.log('All: '+ JSON.stringify(data))),
      catchError(this.handleError)
    );
		
  }
  
  private handleError(err: HttpErrorResponse){
    let errorMessage = '';
    if(err.error instanceof ErrorEvent){
      //A client side or network error
      errorMessage = `An error occured: ${err.error.message}`;
    }else{
      //Backend returned unsuccessfull return code
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}