import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HousingService } from 'src/app/services/housing.service';
import { IProperty } from 'src/app/shared/iproperty';

@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.css']
})
export class PropertyListComponent implements OnInit {
SellRent = 1;
  constructor(private route: ActivatedRoute, private housingService: HousingService) { }
  Properties: Array<IProperty>;
  ngOnInit(): void {
    if (this.route.snapshot.url.toString()) {
      this.SellRent = 2;
    }
    this.housingService.getAllProperties(this.SellRent).subscribe(
      data => {
        this.Properties = data;

        const newProperty = JSON.parse(localStorage.getItem('newProp'));
        if (newProperty.SellRent === this.SellRent) {
          this.Properties = [newProperty, ...this.Properties];
        }
        console.log(data);
      }, error => {
        console.log('httperror:');
        console.log(error);
      }
    );
    }

}
