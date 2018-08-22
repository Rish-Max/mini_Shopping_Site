import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/cart.service';
import { orderService } from 'src/app/order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit {

orderList = [];
totalAmount = 0;
totalQuantity = 0;
shipping = {
  name :"",
  addressLine1 : "",
  addressLine2 : "",
  city : ""
}
  constructor(private cart : CartService,private order: orderService,private router : Router) {
    cart.fetchCart(localStorage.getItem('cartId')).subscribe(
      data => { this.orderList = data.json().product;
                cart.fetchTquantity(localStorage.getItem('cartId')).subscribe(
                  data => this.totalQuantity = data.json().quantity
                )
                this.show();
              }
     )
   }

  ngOnInit() {
  }

 show(){
   for(var items of this.orderList)
   {
     this.totalAmount += items.quantity * items.price;
   }
 }

placeOrder()
{
var products: {title : any,quantity : any,price : any}[] = [];
var i = 0;
 for (let items of this.orderList) {
   if(items.quantity > 0)
   {
    products.push({title : items.title,quantity : items.quantity,price : items.price });
   }
 }

  var userId = localStorage.getItem('token');
  var order ={
    shipping : this.shipping,
    products : products,
    usertoken : userId
  }
  this.order.addOrder(order).subscribe(
    data => {
      if(data.json().status == "Order Place"){
        this.cart.clearCart(localStorage.getItem('cartId')).subscribe(
          data => {
            this.cart.fetchTquantity(localStorage.getItem('cartId')).subscribe(
              data => this.cart.itemQuantity.next({quantity : data.json().quantity})
            )
          }
        )
       this.router.navigate(['/order-success/'+ data.json().orderId]);
      }
    }
  )
}

}
