import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HousingService } from 'src/app/services/housing.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/shared/user';
import { AlertifyService } from 'src/app/services/alertify.service';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {
  registerForm: FormGroup;
  user: User;
  nameList: string[];
  userSubmitted: boolean;
  constructor(private fb: FormBuilder, private uServ: UserService, private hService: HousingService, private aService: AlertifyService) { }

  ngOnInit(): void {
    this.createRegisterForm();
   /*  this.hService.getAllNames().subscribe(data => {
      this.nameList = data;
      console.log(data);
     }); */
  }
  createRegisterForm(): void {
      this.registerForm = this.fb.group({
      userName: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(8)]],
      confirmPassword: [null, Validators.required],
      mobile: [null, [Validators.required, Validators.maxLength(11)]]
      }, {validators: this.passwordMatchingValidator});
  }
     passwordMatchingValidator(fg: FormGroup): Validators{
      return fg.get('password').value === fg.get('confirmPassword').value ? null :
      {notmatched: true};
  }

    onSubmit(): void{
        console.log(this.registerForm.value);
        this.userSubmitted = true;

        if (this.registerForm.valid) {
          // this.user = Object.assign(this.user, this.registerForm.value);
          this.uServ.addUser(this.userData());
          this.registerForm.reset();
          this.userSubmitted = false;
          this.aService.success('Поздравляем! Вы успешно зарегистрировались!');
        }
        else{
           this.aService.error('К сожалению у Вас возникли проблемы с заполнением поле');
        }
     }
     userData(): User{
      return this.user = {
        userName: this.userName.value,
        email: this.email.value,
        password: this.password.value,
        mobile: this.mobile.value
      };
     }
  get userName(): any{
    return this.registerForm.get('userName') as FormControl;
  }
    get email(): any{
    return this.registerForm.get('email') as FormControl;
  }
  get password(): any{
    return this.registerForm.get('password') as FormControl;
  }
    get confirmPassword(): any{
    return this.registerForm.get('confirmPassword') as FormControl;
  }
  get mobile(): any{
    return this.registerForm.get('mobile') as FormControl;
  }
     // angular materials
}
