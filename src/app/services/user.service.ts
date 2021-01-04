import { Injectable } from '@angular/core';
import { User } from 'src/app/shared/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }
   addUser(user: User): void{
        let users = [];
        if (localStorage.getItem('Users')){
          users = JSON.parse(localStorage.getItem('Users'));
          users = [user, ...users];
        } else{
          users = [user];
        }
        localStorage.setItem('Users', JSON.stringify(users)); // здесь я сделала глупую ошибку, забыла 's'
  }
}
