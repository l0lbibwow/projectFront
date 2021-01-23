import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../shared/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

   authUser(user: User): Observable<User> {
    return this.http.get<any>('http://localhost:3000/users')
    .pipe(map(
      data => { return data.find(p => p.userName === user.userName && p.password === user.password);
    }));
  }
}
