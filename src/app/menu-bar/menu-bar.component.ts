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
  ngOnInit(): void {
  }

  loggedIn(): any{
    this.loggedinUser = localStorage.getItem('nameUser');
    return this.loggedinUser;
  }

  onLogout(): void{
    localStorage.removeItem('userRole');
    localStorage.removeItem('nameUser');
    this.alertify.success('Вы вышли из личного профиля');
    this.router.navigate(['/']);
  }
}
