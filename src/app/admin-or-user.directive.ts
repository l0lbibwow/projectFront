import { Directive, ElementRef, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Observable, Subscription, interval  } from 'rxjs';

@Directive({
  selector: '[appAdminOrUser]'
})
export class AdminOrUserDirective implements OnInit{
  private updateSubscription: Subscription;
  constructor(private elementRef: ElementRef, private aServ: AuthService){}

  ngOnInit(): void{
    this.updateSubscription = interval(1000).subscribe(
     (val) => { this.block();
    });
    }
  block(): void{
    const localUsers = localStorage.getItem('token');
    if ((localUsers === 'admin' || localUsers === 'moder') && this.aServ.authUser) {
        this.elementRef.nativeElement.style.display = 'block';
    }else{
        this.elementRef.nativeElement.style.display = 'none';
    }
  }

}
