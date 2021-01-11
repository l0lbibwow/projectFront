import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertifyService } from 'src/app/services/alertify.service';
import { HousingService } from 'src/app/services/housing.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/shared/user';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  constructor(private fb: FormBuilder,private router: Router, private route: ActivatedRoute,  private uServ: UserService, private hService: HousingService, private aService: AlertifyService) { }
  @ViewChild('registerForm') public createRegisterForm: NgForm;
  public userId: number;
  user: User;
  nameList: string[];
  userSubmitted: boolean;
  ngOnInit(): void {

    this.route.paramMap.subscribe(parameterMap => {
      const id = + parameterMap.get('id');
      this.getUser(id);
    });
  }
  private getUser(id: number){
    this.user = Object.assign({},this.uServ.getUser(id));
  }

    onSubmit(): void{

        this.userSubmitted = true;
        const newUser = Object.assign({}, this.user);
   /*        this.mapUser(this.user.Id); */
          this.uServ.addUser2(newUser);
          // console.log(this.registerForm.value);
          this.createRegisterForm.reset();
          this.userSubmitted = false;
          this.router.navigate(['user/users']);
     }
     mapUser(id: number): void {
        this.user  = this.uServ.getUser(id);

    }
/*   get userName(): any{
    return this.registerForm.get('userName') as FormControl;
  }
    get email(): any{
    return this.registerForm.get('email') as FormControl;
  }
  get password(): any{
    return this.registerForm.get('password') as FormControl;
  }
  get mobile(): any{
    return this.registerForm.get('mobile') as FormControl;
  }
  get role(): any{
    return this.registerForm.get('role') as FormControl;
  } */

}