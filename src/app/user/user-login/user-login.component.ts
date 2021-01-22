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

  ngOnInit(): void {

  }
  userName: string;
  role: string;
  onLogin(loginForm: NgForm): void{
    console.log(loginForm.value);

    const token = this.authService.authUser(loginForm.value).subscribe(data => console.log(data))

    if (token) {
      this.authService.authUser(loginForm.value)
      .subscribe(data => {localStorage.setItem('nameUser', data.userName)});

      this.authService.authUser(loginForm.value).subscribe(data => {localStorage.setItem('token', data.role) });
      this.alertify.success('Добро пожаловать!');
      this.router.navigate(['/']);
    } else {
      this.alertify.error('Ваш ник или пароль неправильный');
    }
  }
}
