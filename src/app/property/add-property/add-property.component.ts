import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
  @ViewChild('formTabs') formTabs: TabsetComponent;
  property = new Property();
  addPropertyForm: FormGroup;
  propertyTypes: Array<string> = ['Дом', 'Квартира', 'Многоэтажный'];
  furnishTypes: Array<string> = ['Полностью', 'Полу', 'Немеблированный'];
  nextClicked: boolean;
  cityList: any[];
  constructor(private fb: FormBuilder,
    private r: Router,
    private housingService: HousingService,
    private alertify: AlertifyService) { }
  propertyView: IPropertyBase = {
    id: null,
    name: '',
    price: null,
    sellRent: null,
    pType: null,
    fType: null,
    bhk: null,
    builtArea: null,
    city: ''
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
      basicInfo: this.fb.group({
        sellRent: [null , Validators.required],
        bhk: [null, Validators.required],
        pType: [null, Validators.required],
        fType: [null, Validators.required],
        name: [null, Validators.required],
        city: [null, Validators.required]
      }),

      priceInfo: this.fb.group({
        price: [null, Validators.required],
        builtArea: [null, Validators.required]
      }),

      addressInfo: this.fb.group({
        address: [null, Validators.required],
      }),
    });
  }

      get basicInfo(): FormGroup {
        return this.addPropertyForm.controls.basicInfo as FormGroup;
      }

      get priceInfo(): FormGroup {
        return this.addPropertyForm.controls.priceInfo as FormGroup;
      }

      get addressInfo(): FormGroup {
        return this.addPropertyForm.controls.addressInfo as FormGroup;
      }

      get sellRent(): FormControl {
        return this.basicInfo.controls.sellRent as FormControl;
      }

      get bhk(): FormControl {
        return this.basicInfo.controls.bhk as FormControl;
      }

      get pType(): FormControl {
        return this.basicInfo.controls.pType as FormControl;
      }

      get fType(): FormControl {
        return this.basicInfo.controls.fType as FormControl;
      }

      get name(): FormControl {
        return this.basicInfo.controls.name as FormControl;
      }

      get city(): FormControl {
        return this.basicInfo.controls.city as FormControl;
      }

      get price(): FormControl {
        return this.priceInfo.controls.price as FormControl;
      }

      get builtArea(): FormControl {
        return this.priceInfo.controls.builtArea as FormControl;
      }

      get address(): FormControl {
        return this.addressInfo.controls.address as FormControl;
      }
  onSubmit(): void{
    this.nextClicked = true;
    if (this.allTabsValid()) {
      this.mapProperty();
      this.housingService.addProperty(this.property).subscribe((data: Property) => {
        console.log(data.city);
        if (this.sellRent.value === '2') {
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
    this.property.sellRent = +this.sellRent.value;
    this.property.bhk = this.bhk.value;
    this.property.pType = this.pType.value;
    this.property.name = this.name.value;
    this.property.city = this.city.value;
    this.property.fType = this.fType.value;
    this.property.price = this.price.value;
    this.property.builtArea = this.builtArea.value;
    this.property.address = this.address.value;
  }
   allTabsValid(): boolean {
    if (this.basicInfo.invalid) {
      this.formTabs.tabs[0].active = true;
      return false;
    }

    if (this.priceInfo.invalid) {
      this.formTabs.tabs[1].active = true;
      return false;
    }

    if (this.addressInfo.invalid) {
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
