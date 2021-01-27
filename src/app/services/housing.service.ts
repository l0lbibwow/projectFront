import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { Property } from '../shared/property';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HousingService {

  constructor(private http: HttpClient) { }

  getAllCities(): Observable<string[]>{
    return this.http.get<string[]>('http://localhost:5000/api/city');
  }
  getProperty(id: number): Observable<Property>{
    return this.getAllProperties().pipe(
      map(propertiesArray => propertiesArray.find(p => p.id === id))
    );
  }
  private handleError(errorResponse: HttpErrorResponse){
    if (errorResponse.error instanceof ErrorEvent) {
      console.error('Client Side Error: ', errorResponse.error.message);
    }else{
      console.error('Server Side Error: ', errorResponse);
    }
    return throwError('There is a problem with the service.');
  }
  getAllProperties(SellRent?: number): Observable<Property[]>{
    return this.http.get('http://localhost:3000/properties').pipe(
      map(data => {
        const propertiesArray: Array<Property> = [];
        for (const id in data){
          if (SellRent) {
            if (data.hasOwnProperty(id) && data[id].SellRent === SellRent) {
              propertiesArray.push(data[id]);
            }
          }else{
            propertiesArray.push(data[id]);
          }
        }
        return propertiesArray;
      })
   ).pipe(catchError(this.handleError));
    return this.http.get<Property[]>('http://localhost:3000/properties');
  }
  addProperty(property: Property): Observable<Property> {
    return this.http.post<Property>('http://localhost:3000/properties', property, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }).pipe(catchError(this.handleError));
  }
  newPropID(): number{
    if (localStorage.getItem('PID')) {
      localStorage.setItem('PID', String(+localStorage.getItem('PID') + 1));
      return +localStorage.getItem('PID');
    }
    else{
      localStorage.setItem('PID', '101');
      return 101;
    }
  }
}
