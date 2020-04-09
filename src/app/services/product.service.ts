import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

 // updateCart = new EventEmitter();

  updateCart = new Subject();

 // updateCart = new BehaviorSubject("Default value");

  constructor(private http : HttpClient) {  }

  getProducts(){
    let recievedData : any = this.http.get("http://localhost:3000/listProducts");
    //console.log(recievedData);
    return recievedData;
  }

  getMyCartItems()
  {
    /*var myQueryParams = new HttpParams();

    myQueryParams = myQueryParams.append("usertype", "admin");
    myQueryParams = myQueryParams.append("page", "1");


    return this.http.get("http://localhost:3000/mycart", {
      headers : new HttpHeaders({
        'myauthtoken' : "ghdgdghhghgdghhghgh"
      }), 
      params : myQueryParams
    });*/

    return this.http.get("http://localhost:3000/mycart");

  }
  getProductCategories(){
    return this.http.get("http://localhost:3000/getCategory");
  }

  createProducts(data:any)
  {
    return this.http.post("http://localhost:3000/addproducts", data);
  }

  getProductsByCatwise(catId:number)
  {
    console.log("cat service");
    return this.http.get("http://localhost:3000/getpdtcatwise/"+catId);
  }

  addToMyCartItems(pdtId:number, pdtPrice:number)
  {
    return this.http.post("http://localhost:3000/addtocart", {cartPdtId:pdtId, cartPdtPrice:pdtPrice});
  }

  getCartCount()
  {
    return this.http.get("http://localhost:3000/cartcount");
  }

  updateMyCartItems(cartId:number, cartQty:number, pdtPrice:number)
  {
    return this.http.put("http://localhost:3000/updatecart", {cartId:cartId, cartQty:cartQty, pdtPrice:pdtPrice});
  }
}
