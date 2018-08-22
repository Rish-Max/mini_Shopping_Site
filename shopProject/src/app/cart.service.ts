import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { switchMap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/Rx';

@Injectable({
  providedIn: 'root'
})

export class CartService {


  cartId;
  products;
  itemQuantity = new BehaviorSubject({quantity : 0});
  productQuantity = new BehaviorSubject({productId : "",quantity : 0});
  cartEntry = [];

  constructor(private http:Http) {
   var id = localStorage.getItem('cartId');
   if(id)
   {
     this.fetchTquantity(id).subscribe(
       data => this.itemQuantity.next({quantity : data.json().quantity })
     )
   }
  }



createAndAdd(product)
{
  var Product ={
    productId : product._id,
    title     : product.title,
    quantity : 1,
    price : product.price,
    imagePath :product.imagePath
  }
  return this.http.post("http://localhost:3000/cart/create",{product : Product });
}

addproduct(product,cartId)
{
  var Product ={
    productId : product._id,
    title     : product.title,
    quantity : 1,
    price : product.price,
    imagePath :product.imagePath
  }
   return this.http.post("http://localhost:3000/cart/addProduct",{product : Product ,id : cartId});
}

fetchProduct(productId,cartId)
{
  return this.http.post("http://localhost:3000/cart/fetchProduct",{productId : productId,id : cartId});
}

fetchCart(cartId)
{
  return this.http.post("http://localhost:3000/cart/fetchCart",{id : cartId});
}

fetchTquantity(cartId){
  return this.http.post("http://localhost:3000/cart/fetchTquantity",{id : cartId});
}

removeProduct(product,cartId)
{
var  productId = product._id;

   return this.http.post("http://localhost:3000/cart/removeProduct",{product : productId ,id : cartId});
}

clearCart(id)
{
  return this.http.post("http://localhost:3000/cart/clearCart",{id : id});
}

}
