import { Component, OnInit } from '@angular/core';
import { AlertifyService } from '../services/alertify.service';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.css']
})
export class MenuBarComponent implements OnInit {
loggedinUser: string;
  constructor(private alertify: AlertifyService) { }

  ngOnInit(): void {
  }
  loggedIn(): any{
    this.loggedinUser = localStorage.getItem('token');
    return this.loggedinUser;
  }
  onLogout(): void{
    localStorage.removeItem('token');
    this.alertify.success('Вы вышли из личного профиля');
  }
}
