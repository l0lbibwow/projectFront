import { Component, OnDestroy, OnInit } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/shared/user';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new ReplaySubject(1);
  constructor(private userService: UserService) { }
  Users: User[];
  ngOnInit(): void {
    this.userService.getUsers().pipe(takeUntil(this.unsubscribe$)).subscribe((data: User[]) => {
      this.Users = data;
      console.log(data);
    });
  }
  ngOnDestroy(): void{
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
