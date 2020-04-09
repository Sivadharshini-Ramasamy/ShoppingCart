import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ListProductsComponent } from './products/list-products/list-products.component';
import { NotFoundComponent } from './not-found/not-found.component';


const routes: Routes = [
  {path:'',component:ListProductsComponent},
  {path:'login',component:LoginComponent},
  {path : 'categories', redirectTo : '', pathMatch:'full'},
  {path : 'categories/:catid', component : ListProductsComponent}, 
  {path : 'auth', loadChildren : './auth/auth.module#AuthModule'},
  {path: '**', component : NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy : PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
