import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-property-card',
  templateUrl: './property-card.component.html',
  styleUrls: ['./property-card.component.css']
})
export class PropertyCardComponent implements OnInit {
Property: any = {
  'Id': 1,
  "Name":"Birla House",
  "Type": "House",
  "Price": 12000,
  "image":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRw2NvWocmBVjNMBI2JaS7Nqga-K9qX_k4RJQ&usqp=CAU"

}
  constructor() { }

  ngOnInit(): void {
  }

}
