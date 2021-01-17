import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../shared/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

   authUser(user: User) {
   /*   this.http.get<User[]>("http://localhost:3000/users").subscribe(data => {
      data.find(p => console.log(p))  ;
      }); */
      return this.http.get<User[]>("http://localhost:3000/users").subscribe(data => {
        data.find(p => p.userName === user.userName && p.password === user.password);
      });
  }
}
