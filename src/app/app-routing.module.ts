import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddPropertyComponent } from './property/add-property/add-property.component';
import { PropertyDetailComponent } from './property/property-detail/property-detail.component';
import { PropertyListComponent } from './property/property-list/property-list.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { UserLoginComponent } from './user/user-login/user-login.component';
import { UserRegisterComponent } from './user/user-register/user-register.component';
import { UsersComponent } from './user/users/users.component';
import { UserDetailComponent } from './user/user-detail/user-detail.component';
import { PropertyCardComponent } from './property/property-card/property-card.component';
const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('src/app/property/property-routing.module').then(m => m.PropertyRoutingModule)
  },
  {
    path: 'user',
    loadChildren: () => import('src/app/user/user-routing.module').then(m => m.UserRoutingModule)},
  {
    path: '**', component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routerComponents = [PropertyCardComponent, UserDetailComponent, UsersComponent, AddPropertyComponent, PropertyDetailComponent, PropertyListComponent, PageNotFoundComponent, UserLoginComponent, UserRegisterComponent];
