import { Directive, ElementRef, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Subscription, interval } from 'rxjs';

@Directive({
  selector: '[appAdminOrUser]'
})
export class AdminOrUserDirective implements OnInit{
  private updateSubscription: Subscription;
  constructor(private elementRef: ElementRef, private aServ: AuthService){}

  ngOnInit(): void{
    this.updateSubscription = interval(500).subscribe(
     () => { this.block();
    });
    }
  block(): void {
    const localUsers = localStorage.getItem('userRole');
    if ((localUsers === 'admin' || localUsers === 'moder') && this.aServ.authUser) {
        this.elementRef.nativeElement.style.display = 'block';
    }else{
        this.elementRef.nativeElement.style.display = 'none';
    }
  }
}
