import { Component, OnInit, ViewChild } from '@angular/core';
import {NgForm} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/shared/user';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  @ViewChild('registerForm') public createRegisterForm: NgForm;
  public userId: number;
  user = new User();
  nameList: string[];
  userSubmitted: boolean;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private uServ: UserService) { }
  ngOnInit(): void {
    this.route.paramMap.subscribe(parameterMap => {
      const id = + parameterMap.get('id');
      this.getUser(id);
    });
  }
  private getUser(id: number): any {
     return this.uServ.getUser(id).subscribe((user) => this.user = user,
     (err: any) => console.log(err));
  }

  onSubmit(): void {
    this.userSubmitted = true;
    this.uServ.updateUser(this.user).subscribe(() => {
        this.createRegisterForm.reset();
        this.userSubmitted = false;
        this.router.navigate(['user/users']);
      },
      (error: any) => console.log(error)
    );
  }
}
