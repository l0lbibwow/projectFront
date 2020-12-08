import { Route } from '@angular/compiler/src/core';
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
  onLogin(loginForm: NgForm): void{
    console.log(loginForm.value);
    const token = this.authService.authUser(loginForm.value);
    if (token) {
      localStorage.setItem('token', token.userName);
      this.alertify.success('Login Successful');
      this.router.navigate(['/']);
    } else {
      this.alertify.success('Login not Successful');
    }
  }
}