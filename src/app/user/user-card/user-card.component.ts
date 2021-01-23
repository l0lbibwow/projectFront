import { Component, Input, OnInit, Output } from '@angular/core';
import { EventEmitter } from 'events';
import { User } from 'src/app/shared/user';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css']
})
export class UserCardComponent implements OnInit {

  constructor() { }
  @Input() user: User;
  ngOnInit(): void {
  }

  hideEdit(): any{
    const localUsers = localStorage.getItem('token');
    if (localUsers === 'admin'){
      return localUsers;
    }
  }
}
