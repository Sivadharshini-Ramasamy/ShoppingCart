import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { AuthRoutingModule } from './auth-routing.module';
import { AddProductsComponent } from '../products/add-products/add-products.component';
import { NycartComponent } from '../nycart/nycart.component';


@NgModule({
  declarations: [
    AddProductsComponent,
    NycartComponent
  ],
  imports: [
   SharedModule,
    AuthRoutingModule
  ]
})
export class AuthModule { }
