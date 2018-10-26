import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {map, catchError, tap} from 'rxjs/operators';

@Injectable()
export class HomeService {
    private endpoint = 'http://localhost:3000/api/';
    private httpOptions = {
        headers: new HttpHeaders({'Content-Type': 'application/json'})
    };

    private extractData(res : Response) {
        let body = res;
        return body || {};
    }
    constructor(private http : HttpClient) {}

      getProducts(): Observable<any> {
        return this.http.get(this.endpoint + 'products').pipe(
          map(this.extractData));
      }
            
      addProducts (products): Observable<any> {
        return this.http.post<any>(this.endpoint + 'products', JSON.stringify(products), this.httpOptions).pipe(
          tap((products) => console.log(`added products`)),
          catchError(this.handleError<any>('addProduct'))
        );
      }
      
      updateProducts (products): Observable<any> {
        return this.http.put(this.endpoint + 'products', JSON.stringify(products), this.httpOptions).pipe(
          tap(_ => console.log(`updated products`)),
          catchError(this.handleError<any>('updateProduct'))
        );
      }
      
      deleteProducts (products): Observable<any> {
        return this.http.post<any>(this.endpoint + 'products/remove', JSON.stringify(products), this.httpOptions).pipe(
          tap(_ => console.log(`deleted products`)),
          catchError(this.handleError<any>('deleteProduct'))
        );
      }

      private handleError<T> (operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
      
          // TODO: send the error to remote logging infrastructure
          console.error(error); // log to console instead
      
          // TODO: better job of transforming error for user consumption
          console.log(`${operation} failed: ${error.message}`);
      
          // Let the app keep running by returning an empty result.
          return of(result as T);
        };
      }
}