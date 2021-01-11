import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions } from '@kolkov/ngx-gallery';
import { HousingService } from 'src/app/services/housing.service';
import { Property } from 'src/app/shared/property';

@Component({
  selector: 'app-property-detail',
  templateUrl: './property-detail.component.html',
  styleUrls: ['./property-detail.component.css']
})
export class PropertyDetailComponent implements OnInit {
  public propertyId: number;
  property = new Property();
  constructor(private route: ActivatedRoute, private router: Router, private housingService: HousingService) { }
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  ngOnInit(): void {
    const id = 'id';
    this.propertyId = +this.route.snapshot.params[id];
    this.route.data.subscribe(
      (data: Property) => {
        this.property = data['prp'];
      }
    );
    /* this.route.params.subscribe(
      (params) =>{
        this.propertyId = +params[id];
        this.housingService.getProperty(this.propertyId).subscribe(
          (data) => {
            this.property.Name = data.Name;
            this.property.PType = data.PType;
            this.property.BHK = data.BHK;
            this.property.City = data.City;
            this.property.Price = data.Price;
            this.property.BuiltArea = data.BuiltArea;
          },
          error => this.router.navigate(['/'])
        );
      }
    ); */
    this.galleryOptions = [
      {
        width: '100%',
        height: '465px',
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
        preview: true
      },
    ];
    this.galleryImages = [
      {
        small: 'https://www.thespruce.com/thmb/8RCePpPsuO0_68hbfw3a0ZLY1sc=/2121x1193/smart/filters:no_upscale()/Whitemodernkitchen-GettyImages-1089101352-4eddd67a46984affa521c889b02c5bf1.jpg',
        medium: 'https://www.thespruce.com/thmb/8RCePpPsuO0_68hbfw3a0ZLY1sc=/2121x1193/smart/filters:no_upscale()/Whitemodernkitchen-GettyImages-1089101352-4eddd67a46984affa521c889b02c5bf1.jpg',
        big: 'https://www.thespruce.com/thmb/8RCePpPsuO0_68hbfw3a0ZLY1sc=/2121x1193/smart/filters:no_upscale()/Whitemodernkitchen-GettyImages-1089101352-4eddd67a46984affa521c889b02c5bf1.jpg'
      },
      {
        small: 'https://astkt-photos-kr.kcdn.kz/webp/44/444f74e0-0f27-4117-a511-eb57a5626389/14-750x470.webp',
        medium: 'https://astkt-photos-kr.kcdn.kz/webp/44/444f74e0-0f27-4117-a511-eb57a5626389/14-750x470.webp',
        big: 'https://astkt-photos-kr.kcdn.kz/webp/44/444f74e0-0f27-4117-a511-eb57a5626389/14-750x470.webp'
      },
      {
        small:'https://astkt-photos-kr.kcdn.kz/webp/44/444f74e0-0f27-4117-a511-eb57a5626389/8-full.webp',
        medium:'https://astkt-photos-kr.kcdn.kz/webp/44/444f74e0-0f27-4117-a511-eb57a5626389/8-full.webp',
        big:'https://astkt-photos-kr.kcdn.kz/webp/44/444f74e0-0f27-4117-a511-eb57a5626389/8-full.webp',
      }
    ];
  }
}
