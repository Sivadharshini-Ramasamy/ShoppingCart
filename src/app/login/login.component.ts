import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { ProductService } from '../services/product.service';
declare var $: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  /* userDetail: { username: string, password: string, email: string, phone: string }; */
  loginForm : FormGroup;
  alert:string;
  constructor(private usrServ : UserService, public router : Router, public pdtSer : ProductService) {
    /* var users:[]=usrServ.getUser();
    console.log('From Login Constructor : '+JSON.stringify(users)); */
  }

  ngOnInit() {
    $('.toggle').click(function () {
      // Switches the Icon
      $(this).children('i').toggleClass('fa-pencil');
      // Switches the forms  
      $('.form').animate({
        height: "toggle",
        'padding-top': 'toggle',
        'padding-bottom': 'toggle',
        opacity: "toggle"
      }, "slow");
    });
    this.loginForm=new FormGroup({
      "username":new FormControl('', Validators.required),
      "password":new FormControl('',Validators.required)
    });
  }
  addUser(formDetail:NgForm){
    //console.log(formDetail.value);
    /* this.userDetail=formDetail.value; */
    this.usrServ.addUser(formDetail.value).subscribe((data:any)=>{
      console.log(data);
    },(error:any)=>{
      console.log(error);
    });
    formDetail.reset();
    /* console.log(this.userDetail); */
  }
  doLogin(){
    console.log(this.loginForm.value);
    this.usrServ.loginUser(this.loginForm.value).subscribe((data:string)=>{
      console.log(data);
      if(data.length>0){
        console.log('compo'+ data);
        this.alert="Login Success";
        localStorage.setItem('loggedInUser',data);
        this.pdtSer.updateCart.next();
        this.router.navigateByUrl('/');
      }
      else{
        this.alert="Please enter valid username and password";
      } 
    },(error:any)=>{
      console.log(error);
    });
    //this.loginForm.reset();
  }
}
