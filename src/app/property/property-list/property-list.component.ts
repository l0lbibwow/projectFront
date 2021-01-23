import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HousingService } from 'src/app/services/housing.service';
import { IProperty } from 'src/app/shared/iproperty';
import { Property } from 'src/app/shared/property';

@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.css']
})
export class PropertyListComponent implements OnInit {
  SellRent = 1;
  constructor(private route: ActivatedRoute, private housingService: HousingService) { }
  Properties: Array<Property>;
  Today = new Date();
  public City = '';
  public SearchCity = '';
  public SortbyParam = '';
  public SortDirection = 'asc';

  ngOnInit(): void {
    if (this.route.snapshot.url.toString()) {
      this.SellRent = 2;
    }
    this.housingService.getAllProperties(this.SellRent).subscribe(
      data => {
        this.Properties = data;
      }, error => {
        console.log('httperror:');
        console.log(error);
      }
    );
    }
    onCityFilter(): void{
      this.SearchCity = this.City;
    }
    onCityFilterClear(): void{
      this.SearchCity = '';
      this.City = '';
    }
    onSortDirection(): void{
      if (this.SortDirection === 'desc') {
          this.SortDirection = 'asc';
      }else{
        this.SortDirection = 'desc';
      }
    }

}
