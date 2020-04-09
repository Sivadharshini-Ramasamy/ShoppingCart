import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http : HttpClient) { }
  addUser(userData:any){
    /* console.log(userDetail);
    this.usersArray.push(userDetail);
    sessionStorage.setItem('udetails',JSON.stringify(this.usersArray)); */
    return this.http.post("http://localhost:3000/register", userData);
  }
  getUser(){
    return JSON.parse(sessionStorage.getItem('udetails'));
  }
  loginUser(loginData:any){
    //console.log (JSON.stringify(loginData) + "from service");
    return this.http.post("http://localhost:3000/login", loginData);
  }
  isLoggedIn(){
    return !!localStorage.getItem("loggedInUser");
  }

  getMyToken()
  {
    return localStorage.getItem("loggedInUser");

  }
}
