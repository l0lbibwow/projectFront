import { Injectable } from '@angular/core';
import { User } from 'src/app/shared/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }
  getUser(id: number): User{
    let UserArray = [];
    UserArray = JSON.parse(localStorage.getItem('newUser'));

    return UserArray.find(v => v.Id === id);
  }


   addUser2(user: User) {
    let newProp = [user];
    if (localStorage.getItem('newUser')) {
      newProp = [user, ...JSON.parse(localStorage.getItem('newUser'))];
    }
    localStorage.setItem('newUser', JSON.stringify(newProp));
  }
  updateUser(user: User): void {
    let Users = this.getUsers();
    Users = Users.map( u => {
      if (u.Id !== user.Id) {
        return u;
      }
      return user;
    });
   // localStorage.setItem('newUser', JSON.stringify(Users));
  }
  getUsers(): User[] {
    return JSON.parse(localStorage.getItem('newUser'));
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
