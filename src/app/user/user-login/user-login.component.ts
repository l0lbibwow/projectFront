import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { AlertifyService } from 'src/app/services/alertify.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router, private alertify: AlertifyService) { }
  public userName: string;
  public role: string;

  ngOnInit(): void {

  }
  onLogin(loginForm: NgForm): void{
    console.log(loginForm.value);
    this.authService.authUser(loginForm.value).subscribe(data => {
      if (data !== undefined) {
        this.authService.authUser(loginForm.value).subscribe(data => {localStorage.setItem('nameUser', data.userName); });
        this.authService.authUser(loginForm.value).subscribe(data => {localStorage.setItem('userRole', data.role); });
        this.alertify.success('Добро пожаловать!');
        this.router.navigate(['/']);
      }else{
        this.alertify.error('Ваш ник или пароль неправильный или Вам нужно зарегистрироваться');
      }
     });
  }
}
