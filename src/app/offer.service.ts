import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OfferService {

  private baseUrl = 'https://www.ilportaleofferte.it/portaleOfferte/resources/opendata/csv/offerteML';

  constructor(private http: HttpClient) { }

  getOffers(): Observable<any> {
    const currentDate = new Date();
    const year = currentDate.getFullYear().toString();
    const month = (currentDate.getMonth() + 1).toString();
    const padmonth = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const day = currentDate.getDate().toString().padStart(2, '0');
    const url = `${this.baseUrl}/${year}_${month}/PO_Offerte_E_MLIBERO_${year}${padmonth}${day}.xml`;

    const cachedData = localStorage.getItem(url);

    if (cachedData) {
      return of(cachedData);
    } else {
      return this.http.get(url, { 
        responseType: 'text',
        headers: {
            'cache-control': 'public, max-age=3600',
            'Content-Type': 'application/xml',
            'Accept': 'application/xml',
            'Access-Control-Allow-Origin' : '',
        }
    }).pipe(
        tap(data => localStorage.setItem(url, data)),
        catchError((error: HttpErrorResponse) => {
          if (error.error instanceof ErrorEvent) {
            // Client-side error
            console.error('An error occurred:', error.error.message);
            return throwError(() => new Error('An error occurred: ' + error.error.message)); // Re-throw the error
          } else {
            // Server-side error (including CORS errors)
            console.error(`Backend returned code ${error.status}, body was: ${error.error}`);

             if (error.status === 0) { // Likely a CORS error
              return throwError(() => new Error('CORS Error: The server is not configured to allow requests from this origin.'));
             } else {
               return throwError(() => new Error(`Backend returned code ${error.status}, body was: ${error.error}`));
             }
          }
        })
      );
    }
  }
}