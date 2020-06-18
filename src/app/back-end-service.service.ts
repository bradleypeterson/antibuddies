import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MessageService } from "./message.service";
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BackEndServiceService {
  
  constructor(private http: HttpClient, private messageService: MessageService) { }

  private dataUrl = 'api/vlab';  // URL to web api

  //sample function that does not pull from URL:
  getTestData(): Observable<string[]> {
    let sampleString: string[] = [
      "This",
      "is",
      "from",
      "the",
      "dataService"
    ];
    return of(sampleString);
  }

  /** GET data from the server */
  getData(): Observable<string[]> {
    return this.http.get<string[]>(this.dataUrl)
      .pipe(
        tap(_ => this.log('fetched heroes')),
        catchError(this.handleError<string[]>('getHeroes', []))
      );
  }


    /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }


    /** Log a back end Service message with the MessageService */
    private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }

}
