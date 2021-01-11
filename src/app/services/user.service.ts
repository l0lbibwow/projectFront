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
    console.log(UserArray.find(v => v.Id === id));
    return UserArray.find(v => v.Id === id);
  }
   addUser2(user: User) {
    let newProp = [user];
    let users = [];
    users = JSON.parse(localStorage.getItem('newUser'));
    if (user.Id === null && user.Id === undefined) {
      const maxId = users.reduce((e1,e2) => {
          return(e1.Id > e2.Id) ? e1 : e2;
      }).Id;
      user.Id = maxId + 1;
    }
      if (localStorage.getItem('newUser')) {
        newProp = [user, ...JSON.parse(localStorage.getItem('newUser'))];
      }
    localStorage.setItem('newUser', JSON.stringify(newProp));

  }
  newUserID(){
    if (localStorage.getItem('UserPid')) {
      localStorage.setItem('UserPid', String(+localStorage.getItem('UserPid') + 1));
      return +localStorage.getItem('UserPid');
    }
    else{
      localStorage.setItem('UserPid', '101');
      return 101;
    }
  }
}
