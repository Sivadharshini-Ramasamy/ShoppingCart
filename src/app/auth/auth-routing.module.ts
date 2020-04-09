import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NycartComponent } from '../nycart/nycart.component';
import { AddProductsComponent } from '../products/add-products/add-products.component';


const routes: Routes = [
 
  {path : '', children : [
    {path:'mycart', component:NycartComponent},
    {path:'addProduct',component:AddProductsComponent}
  ]}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
