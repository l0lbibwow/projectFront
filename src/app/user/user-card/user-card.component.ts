import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/shared/user';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css']
})
export class UserCardComponent implements OnInit {
  @Input() user: User;
  constructor() { }
  ngOnInit(): void {
  }

  hideEdit(): any {
    const localUsers = localStorage.getItem('userRole');
    if (localUsers === 'admin'){
      return localUsers;
    }
  }
}
