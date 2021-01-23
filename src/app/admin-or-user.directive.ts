import { Directive, ElementRef, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';

@Directive({
  selector: '[appAdminOrUser]'
})
export class AdminOrUserDirective implements OnInit{

  constructor(private elementRef: ElementRef, private authService: AuthService) { }


  ngOnInit(){
    const localUsers = localStorage.getItem('token');
    if ((localUsers === 'admin' || localUsers === 'moder') && this.authService.authUser) {
        this.elementRef.nativeElement.style.display = 'block';
    }else{
        this.elementRef.nativeElement.style.display = 'none';
    }
  }
}

