import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HousingService } from 'src/app/services/housing.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/shared/user';
import { AlertifyService } from 'src/app/services/alertify.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {
  registerForm: FormGroup;
  user = new User();
  nameList: string[];
  userSubmitted: boolean;
  constructor(private route: ActivatedRoute, private fb: FormBuilder, private uServ: UserService, private hService: HousingService, private aService: AlertifyService) { }
  /* public userId: number; */
  ngOnInit(): void {
    this.createRegisterForm();/*
    this.userId = +this.route.snapshot.params['id']; */
   /*  this.route.paramMap.subscribe(parameterMap => {
      const id = +parameterMap.get('id');
      this.getUser(id);
    }); */
  }
  createRegisterForm(): void {
      this.registerForm = this.fb.group({
        role:[null, [Validators.required]],
        userName: [null, Validators.required],
        email: [null, [Validators.required, Validators.email]],
        password: [null, [Validators.required, Validators.minLength(3)]],
        confirmPassword: [null, Validators.required],
        mobile: [null, [Validators.required, Validators.minLength(3)]]

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
          this.mapUser();
          this.uServ.addUser2(this.user);
          console.log(this.registerForm.value);
          this.registerForm.reset();
          this.userSubmitted = false;
          this.aService.success('Поздравляем! Вы успешно зарегистрировались!');

        }
        else{
           this.aService.error('К сожалению у Вас возникли проблемы с заполнением поле');
        }

     }
     mapUser(): void {
        this.user.Id = this.uServ.newUserID();
        this.user.role = this.role.value;
        this.user.userName = this.userName.value;
        this.user.email = this.email.value;
        this.user.password = this.password.value;
        this.user.mobile = this.mobile.value;

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
  get role(): any{
    return this.registerForm.get('role') as FormControl;
  }
     // angular materials
 /*     getUser(id: number): void{
      this.user = Object.assign({}, this.uServ.getUser(id))
     } */
}
