import { HttpClient} from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/user';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  constructor(private http: HttpClient) { }
    Users: Array<User> = [
      {
        Id: null,
        userName: null,
        email: null,
        mobile: null,
        password:null,
        role:null      }
    ];
  ngOnInit(): void {
    this.Users =JSON.parse(localStorage.getItem('newUser'));

    /* console.log(this.Users); */
  }

}
