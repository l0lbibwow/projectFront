import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgxGalleryModule } from '@kolkov/ngx-gallery';

import { routerComponents } from './app-routing.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuBarComponent } from './menu-bar/menu-bar.component';
import { HousingService } from './services/housing.service';
import { UserService } from './services/user.service';
import { AlertifyService } from './services/alertify.service';
import { AuthService } from './services/auth.service';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { ProductDetailResolverService } from './property/property-detail/product-detail-resolver.service';
import { FilterPipe } from './pipes/filter.pipe';
import { SortPipe } from './pipes/sort.pipe';
import { BoldDirective } from './bold.directive';
import { AdminOrUserDirective } from './admin-or-user.directive';
@NgModule({
  declarations: [
    AppComponent,
    MenuBarComponent,
    routerComponents,
    FilterPipe,
    SortPipe,
    BoldDirective,
    AdminOrUserDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    ButtonsModule.forRoot(),
    BsDatepickerModule.forRoot(),
    NgxGalleryModule
  ],
  providers: [HousingService, UserService, AlertifyService, AuthService, ProductDetailResolverService],
  bootstrap: [AppComponent],
  exports: [
    AdminOrUserDirective
  ]
})
export class AppModule { }
