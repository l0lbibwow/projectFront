import { HttpClient} from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/shared/user';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  constructor(private http: HttpClient, private userService: UserService) { }
    Users: User[];
  ngOnInit(): void {
    this.userService.getUsers().subscribe((data: User[]) => {
      this.Users = data;
      console.log(data);
    });
  }
}
