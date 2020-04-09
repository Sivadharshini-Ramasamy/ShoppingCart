import { Injectable } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { UserService } from './services/user.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(public userSer : UserService) { }

  intercept(req, next)
  {

    var tokenizedReq = req.clone({
      setHeaders : {
        'myauthtoken' : (this.userSer.getMyToken()) ? this.userSer.getMyToken() : ''
      }
    })


    return next.handle(tokenizedReq);
  }
}
