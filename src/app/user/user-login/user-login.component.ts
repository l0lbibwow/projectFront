import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { AlertifyService } from 'src/app/services/alertify.service';
import { map } from 'rxjs/operators';
import { User } from 'src/app/shared/user';

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
    console.log(token);
    if (token) {
     // localStorage.setItem('token', );
     // localStorage.setItem('nameUser', token.userName);
      this.alertify.success('Login Successful');
      this.router.navigate(['/']);
    } else {
      this.alertify.error('User id or password is wrong');
    }
  }
}
