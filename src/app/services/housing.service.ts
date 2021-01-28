import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { Property } from '../shared/property';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HousingService {

  constructor(private http: HttpClient) { }
  baseUrl = environment.baseUrl;
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
    return this.http.get(`${this.baseUrl}/properties`).pipe(
      map(data => {
        const propertiesArray: Array<Property> = [];
        for (const id in data){
          if (SellRent) {
            if (data.hasOwnProperty(id) && data[id].sellRent === SellRent) {
              propertiesArray.push(data[id]);
            }
          }else{
            propertiesArray.push(data[id]);
          }
        }
        return propertiesArray;
      })
   ).pipe(catchError(this.handleError));
    return this.http.get<Property[]>(`${this.baseUrl}/properties`);
  }
  addProperty(property: Property): Observable<Property> {
    return this.http.post<Property>(`${this.baseUrl}/properties`, property, {
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
