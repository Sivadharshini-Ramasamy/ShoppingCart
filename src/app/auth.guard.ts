import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from './services/user.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(public userSer : UserService, public myRoute : Router)
  {

  }

  canActivate() :boolean
  {

    if(!this.userSer.isLoggedIn())
    {

      this.myRoute.navigateByUrl("/login");
    }

    return this.userSer.isLoggedIn();
    
  }
  
}
