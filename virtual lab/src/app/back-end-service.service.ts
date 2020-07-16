import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MessageService } from "./message.service";
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { LabsContainer, lab } from "./interfaces"

@Injectable({
  providedIn: 'root'
})
export class BackEndServiceService {

  constructor(private http: HttpClient, private messageService: MessageService) { }

  private dataUrl = 'api/vlab';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  labsContainer = new LabsContainer()

  getLabsContainer(): Observable<LabsContainer> {
    return of(this.labsContainer);
  }

  // put lab
  putLab(lab: lab): Observable<lab> {
    return this.http.post<lab>(this.dataUrl, lab, this.httpOptions).pipe(
      tap((newLab: lab) => this.log(`added lab w/ id=${newLab.labID}`)),
      catchError(this.handleError<lab>('addLab'))
    );
  }

  // put Node
  putNode(node: any): Observable<any> {
    return this.http.post<any>(this.dataUrl, node, this.httpOptions).pipe(
      tap((newNode: any) => this.log(`added lab w/ id=${newNode.nodeID}`)),
      catchError(this.handleError<lab>('addNode'))
    );
  }

  //get labs container, updates global labsContainer
  getlabsContainer() {
    this.getHTTPLabsContainer().subscribe(labsBox => this.labsContainer = labsBox);
    return this.labsContainer;
  }

  //http get all labs container
  getHTTPLabsContainer(): Observable<LabsContainer> {
    return this.http.get<LabsContainer>(this.dataUrl)
      .pipe(
        tap(_ => this.log('fetched labs container')),
        catchError(this.handleError<LabsContainer>('get labs Container'))
      )
  }

  /** GET lab by id. Return `undefined` when id not found */
  getLabNo404<lab>(id: number): Observable<lab> {
    const url = `${this.dataUrl}/?id=${id}`;
    return this.http.get<lab[]>(url)
      .pipe(
        map(labs => labs[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} lab id=${id}`);
        }),
        catchError(this.handleError<lab>(`getLab id=${id}`))
      );
  }

  //get node by id
  /** GET node by id. Return `undefined` when id not found */
  getNuizNo404(id: number): Observable<any> { 
    const url = `${this.dataUrl}/nodes/?id=${id}`;
    return this.http.get<any[]>(url)
      .pipe(
        map(nodes => nodes[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} node id=${id}`);
        }),
        catchError(this.handleError<lab>(`getNode id=${id}`))
      );
  }
  

  //examples:

  getUsers(): Observable<any> {
    const options = {
      responseType: 'text' as const,
    };
    return this.http.get('https://jsonplaceholder.typicode.com/users', options)
  }



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
