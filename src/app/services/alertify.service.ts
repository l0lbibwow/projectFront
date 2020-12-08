import { Injectable } from '@angular/core';
import * as alertyfy from 'alertifyjs';
@Injectable({
  providedIn: 'root'
})
export class AlertifyService {

  constructor() { }
  success(message: string): void{
      alertyfy.success(message);
  }
  warning(message: string): void{
      alertyfy.warning(message);
  }
  error(message: string): void{
      alertyfy.error(message);
  }
}
