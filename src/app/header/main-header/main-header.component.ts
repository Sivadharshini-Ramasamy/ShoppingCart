import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.css']
})
export class MainHeaderComponent implements OnInit {

  cartCount = 0;

  constructor(private usrServ : UserService, private router : Router, public pdtSer : ProductService) {
    console.log(usrServ.isLoggedIn());
  }

  ngOnInit() {

    this.getCartCount();

    this.pdtSer.updateCart.subscribe((data:any)=>{
      console.log(data);
      //this.cartCount++;

      this.getCartCount();

    })
  }
  doLogout(){
    this.cartCount = 0;
    localStorage.clear();
    this.router.navigateByUrl('/login');
  }

  getCartCount()
  {
    this.pdtSer.getCartCount().subscribe((count:number)=>{
      this.cartCount = count;
    });
  }
}
