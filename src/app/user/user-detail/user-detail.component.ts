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
  user = new User();
  nameList: string[];
  userSubmitted: boolean;
  ngOnInit(): void {

    this.route.paramMap.subscribe(parameterMap => {
      const id = + parameterMap.get('id');
      this.getUser(id);
    });
  }
  private getUser(id: number){
     return this.uServ.getUser(id).subscribe((user) => this.user = user,
     (err:any) => console.log(err))
  }

    onSubmit(): void{
        this.userSubmitted = true;
      //  const newUser: User = Object.assign({}, this.user);
        this.uServ.updateUser(this.user).subscribe(
          () => {
            this.createRegisterForm.reset();
            this.userSubmitted = false;
            this.router.navigate(['user/users']);
          },
          (error: any) => console.log(error)
        );

     }
}
