import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertifyService } from '../services/alertify.service';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.css']
})
export class MenuBarComponent implements OnInit {
  loggedinUser: string;
  constructor(private alertify: AlertifyService, private router: Router) { }
  AdminOrModer: boolean;
  ngOnInit(): void {
  }

  loggedIn(): any{
    this.loggedinUser = localStorage.getItem('nameUser');
    const localUsers = localStorage.getItem('token');
        if (localUsers === 'admin' || localUsers === 'moder') {
          this.AdminOrModer = true;
    }
    return this.loggedinUser;
  }

  onLogout(): void{
    this.AdminOrModer = false;
    localStorage.removeItem('token');
    localStorage.removeItem('nameUser');
    this.alertify.success('Вы вышли из личного профиля');
    this.router.navigate(['/']);
  }
}
