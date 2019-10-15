import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UnsoSunMoonData } from './unso-sun-moon-data.sunmoonday';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsnoService {
  private usnoApiUrl = 'https://api.usno.navy.mil/rstt/oneday?id=jdstew&date=today&loc=Seattle,%20WA'; // 'assets/sample-sunmoon.json'; // for testing

  constructor(private httpClient: HttpClient) { }

  getSunMoonData(): Observable<UnsoSunMoonData> {
    return this.httpClient.get<UnsoSunMoonData>(this.usnoApiUrl).pipe(
      tap(data => console.log('All: ' + JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  getDateTime(usnoData: UnsoSunMoonData, rawDayTimeString: string): Date {
    let regexPattern = /[0-9]+:[0-9]+/; // match and extract the time from the string
    let timeAsStringArray: string[] = rawDayTimeString.match(regexPattern); // match returns an array

    let dateTime: Date;
    if (timeAsStringArray.length > 0) {
      let timeAsString: string;
      timeAsString = timeAsStringArray[0].padStart(5, '0'); // convert to a '##:##' format

      // formulate Date string as YYYY-MM-DDTHH:mm:ss.sssZ
       dateTime = new Date(usnoData.year + '-' +  // assumed to always be 4-digits in length
        usnoData.month.toString().padStart(2, '0') + '-' +  // convert month to 2-digit string
        usnoData.day.toString().padStart(2, '0') + 'T' +  // convert day to 2-digit string
        timeAsString + ':00');
      if (rawDayTimeString.search('p.m.') > 1) {
        dateTime.setHours((dateTime.getHours() + 12));
      }
    } else {
      dateTime = new Date(usnoData.year + '-' +  // assumed to always be 4-digits in length
        usnoData.month.toString().padStart(2, '0') + '-' +  // convert month to 2-digit string
        usnoData.day.toString().padStart(2, '0') +   // convert day to 2-digit string
        'T00:00:00');
    }
    return dateTime;
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
