import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { WeatherObservation } from './nws-observation';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NwsService {
  private nwsApiUrl = 'https://api.weather.gov/stations/KBFI/observations?limit=1'; // 'assets/sample-wxobs.json'; // for testing

  constructor(private httpClient: HttpClient) { }

  getWxData(): Observable<WeatherObservation> {
    return this.httpClient.get<WeatherObservation>(this.nwsApiUrl).pipe(
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