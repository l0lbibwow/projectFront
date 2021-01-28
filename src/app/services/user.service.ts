import { Injectable } from '@angular/core';
import { User } from 'src/app/shared/user';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError} from 'rxjs/operators';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
  baseUrl = environment.baseUrl;
  getUser(id: number): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/users/${id}`)
    .pipe(catchError(this.handleError));
  }
  private handleError(errorResponse: HttpErrorResponse){
    if (errorResponse.error instanceof ErrorEvent) {
      console.error('Client Side Error: ', errorResponse.error.message);
    }else{
      console.error('Server Side Error: ', errorResponse);
    }
    return throwError('There is a problem with the service.');
  }

  addUser(user: User): Observable<User>  {
    return this.http.post<User>(`${this.baseUrl}/users`, user, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }).pipe(catchError(this.handleError));
  }
  updateUser(user: User): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/users/${user.id}`, user, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }).pipe(catchError(this.handleError));
  }
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/users`);
  }
  newUserID(): number{
    if (localStorage.getItem('UserPid')) {
      localStorage.setItem('UserPid', String(+localStorage.getItem('UserPid') + 1));
      return +localStorage.getItem('UserPid');
    }
    else{
      localStorage.setItem('UserPid', '1');
      return 1;
    }
  }
}
