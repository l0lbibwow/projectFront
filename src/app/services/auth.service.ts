import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

   authUser(user: any) {
      let UserArray = [];
      if (localStorage.getItem('newUser')) {
        UserArray = JSON.parse(localStorage.getItem('newUser'));
      }
      return UserArray.find(p => p.userName === user.userName && p.password === user.password);
  }
}
