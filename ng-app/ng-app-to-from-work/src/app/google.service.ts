import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { GoogleDirections } from './google-directions';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GoogleService {
  private googleDirectionsApiUrl = './api/b6097afbe0a4472ab40eefabcc9d246e'; // 'assets/sample-directions.json' // for testing

  constructor(private httpClient: HttpClient) { }

  getDirections(): Observable<GoogleDirections> {
    return this.httpClient.get<GoogleDirections>(this.googleDirectionsApiUrl).pipe(
      tap(data => console.log('All: ' + JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  handleError(err: Error) {
    let errorMessage = '';
    if (err instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `Server returned code: ${err.name}, and error message of: ${err.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}