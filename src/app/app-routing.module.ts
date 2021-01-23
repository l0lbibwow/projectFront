import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddPropertyComponent } from './property/add-property/add-property.component';
import { PropertyDetailComponent } from './property/property-detail/property-detail.component';
import { PropertyListComponent } from './property/property-list/property-list.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { UserLoginComponent } from './user/user-login/user-login.component';
import { UserRegisterComponent } from './user/user-register/user-register.component';
import { ProductDetailResolverService } from './property/property-detail/product-detail-resolver.service';
import { UsersComponent } from './user/users/users.component';
import { UserDetailComponent } from './user/user-detail/user-detail.component';
const routes: Routes = [
  { path: '', component: PropertyListComponent},
  {path: 'rent-property', component: PropertyListComponent},
  {path: 'property-detail/:id', component: PropertyDetailComponent, resolve: {prp: ProductDetailResolverService}},
  {path: 'user/users/user-detail/:id', component: UserDetailComponent},
  { path: 'add-property', component: AddPropertyComponent},
   {path: 'user/login', component: UserLoginComponent},
  { path: 'user/register', component: UserRegisterComponent},
  { path: 'user/users', component: UsersComponent},
  { path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { };
export const routerComponents = [AddPropertyComponent, PropertyDetailComponent, PropertyListComponent, PageNotFoundComponent, UserLoginComponent, UserRegisterComponent];
