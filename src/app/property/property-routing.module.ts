import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddPropertyComponent } from './add-property/add-property.component';
import { PropertyCardComponent } from './property-card/property-card.component';
import { ProductDetailResolverService } from './property-detail/product-detail-resolver.service';
import { PropertyDetailComponent } from './property-detail/property-detail.component';
import { PropertyListComponent } from './property-list/property-list.component';

const routes: Routes = [
  {
    path: '',
    component: PropertyListComponent
  },
  {
    path: 'rent-property',
    component: PropertyListComponent
  },
  {
    path: 'property-detail/:id',
    component: PropertyDetailComponent, resolve: {prp: ProductDetailResolverService}
  },
  {
    path: 'add-property',
    component: AddPropertyComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [ProductDetailResolverService]
})
export class PropertyRoutingModule { }
export const routerComponents = [PropertyCardComponent, AddPropertyComponent, PropertyDetailComponent, PropertyListComponent];
