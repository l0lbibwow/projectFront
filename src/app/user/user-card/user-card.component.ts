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
  @Output() notify = new EventEmitter();
  ngOnInit(): void {
  }
  public AdminOrModer: boolean;
  hideEdit(): any{
    const localUsers = localStorage.getItem('token');
    if(localUsers === 'admin'){
      return localUsers;
    }
  }
}
