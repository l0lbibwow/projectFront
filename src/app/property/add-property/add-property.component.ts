import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TabsetComponent } from 'ngx-bootstrap/tabs/public_api';
import { IPropertyBase } from 'src/app/shared/ipropertybase';
import { HousingService } from 'src/app/services/housing.service';
import { AlertifyService } from 'src/app/services/alertify.service';
import { Property } from 'src/app/shared/property';


@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.css']
})
export class AddPropertyComponent implements OnInit {
  // @ViewChild('Form') addPropertyForm: NgForm;
  @ViewChild('formTabs') formTabs: TabsetComponent;
  property = new Property();
  addPropertyForm: FormGroup;
  constructor(private fb: FormBuilder, private r: Router, private housingService: HousingService, private alertify: AlertifyService) { }
  propertyTypes: Array<string> = ['Дом', 'Квартира', 'Многоэтажный'];
  furnishTypes: Array<string> = ['Полностью', 'Полу', 'Немеблированный'];
  nextClicked: boolean;
  cityList: any[];
  propertyView: IPropertyBase = {
    id: null,
    Name: '',
    Price: null,
    SellRent: null,
    PType: null,
    FType: null,
    BHK: null,
    BuiltArea: null,
    City: '',
    RTM: null
  };

  ngOnInit(): void {
    this.CreatedAddPropertyForm();
    this.housingService.getAllCities().subscribe(data => {
      this.cityList = data;
      console.log(data);
    });
  }
  CreatedAddPropertyForm(): void{
    this.addPropertyForm = this.fb.group({
      BasicInfo: this.fb.group({
        SellRent: [null , Validators.required],
        BHK: [null, Validators.required],
        PType: [null, Validators.required],
        FType: [null, Validators.required],
        Name: [null, Validators.required],
        City: [null, Validators.required]
      }),

      PriceInfo: this.fb.group({
        Price: [null, Validators.required],
        BuiltArea: [null, Validators.required]
      }),

      AddressInfo: this.fb.group({
        Address: [null, Validators.required],
      }),
    });
  }

      get BasicInfo(): FormGroup {
        return this.addPropertyForm.controls.BasicInfo as FormGroup;
      }

      get PriceInfo(): FormGroup {
        return this.addPropertyForm.controls.PriceInfo as FormGroup;
      }

      get AddressInfo(): FormGroup {
        return this.addPropertyForm.controls.AddressInfo as FormGroup;
      }

      get SellRent(): FormControl {
        return this.BasicInfo.controls.SellRent as FormControl;
      }

      get BHK(): FormControl {
        return this.BasicInfo.controls.BHK as FormControl;
      }

      get PType(): FormControl {
        return this.BasicInfo.controls.PType as FormControl;
      }

      get FType(): FormControl {
        return this.BasicInfo.controls.FType as FormControl;
      }

      get Name(): FormControl {
        return this.BasicInfo.controls.Name as FormControl;
      }

      get City(): FormControl {
        return this.BasicInfo.controls.City as FormControl;
      }

      get Price(): FormControl {
        return this.PriceInfo.controls.Price as FormControl;
      }

      get BuiltArea(): FormControl {
        return this.PriceInfo.controls.BuiltArea as FormControl;
      }

      get Address(): FormControl {
        return this.AddressInfo.controls.Address as FormControl;
      }
  onSubmit(): void{
    this.nextClicked = true;
    if (this.allTabsValid()) {
      this.mapProperty();
      this.housingService.addProperty(this.property).subscribe((data: Property) => {
        console.log(data.City);
        if (this.SellRent.value === '2') {
        this.r.navigate(['/rent-property']);
      } else {
        this.r.navigate(['/']);
      }
      });
      this.alertify.success('Congrats, your property listed successfully on our website');

    } else {
      this.alertify.error('Please review the form and provide all valid entries');
    }
  }

   mapProperty(): void {
  ///  this.property.id = this.housingService.newPropID();
    this.property.SellRent = +this.SellRent.value;
    this.property.BHK = this.BHK.value;
    this.property.PType = this.PType.value;
    this.property.Name = this.Name.value;
    this.property.City = this.City.value;
    this.property.FType = this.FType.value;
    this.property.Price = this.Price.value;
    this.property.BuiltArea = this.BuiltArea.value;
    this.property.Address = this.Address.value;
  }
   allTabsValid(): boolean {
    if (this.BasicInfo.invalid) {
      this.formTabs.tabs[0].active = true;
      return false;
    }

    if (this.PriceInfo.invalid) {
      this.formTabs.tabs[1].active = true;
      return false;
    }

    if (this.AddressInfo.invalid) {
      this.formTabs.tabs[2].active = true;
      return false;
    }
    return true;
  }
  selectTab(tabId: number, IsCurrentTabValid: boolean): void {
    this.nextClicked = false;
    if (IsCurrentTabValid) {
      this.formTabs.tabs[tabId].active = true;
    }
  }
}
