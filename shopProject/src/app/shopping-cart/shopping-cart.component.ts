import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/cart.service';
import { AdminService } from 'src/app/admin.service';


@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})

export class ShoppingCartComponent implements OnInit {



totalItems = 0;
totalAmount = 0;
cartItems: Array<{ _id : any,title :any,price:any,quantity:any,url:any}> = [];
  constructor(private cart : CartService,private itemList:AdminService) {
      var id = localStorage.getItem('cartId');
      if(id)
      {
        this.cart.fetchTquantity(id).subscribe(
          (data) => this.totalItems = data.json().quantity )
          this.cart.fetchCart(id).subscribe(
            data => {
              var i =0;
              for (let items of  data.json().product) {
                  this.cartItems.push({ _id:items.productId,title :items.title,price:items.price,quantity:items.quantity,url:items.imagePath})
             }
             this.show();
           })

      }
   }

ngOnInit(){

}

show(){
  var totalPrice = 0;
  for (let item of this.cartItems) {
    totalPrice += item.quantity * item.price;
  }
  this.totalAmount = totalPrice
}

add(product)
{
  this.cart.addproduct(product, localStorage.getItem('cartId')).subscribe(
    data => {
       this.getTotalQuantity(localStorage.getItem('cartId'));
       this.getItemsQuantity(product._id, localStorage.getItem('cartId'));
    }
  )

  this.cart.itemQuantity.subscribe(
    (values :{ quantity : any}) => this.totalItems = values.quantity
  );

  this.cart.productQuantity.subscribe(
    (data: { productId: any, quantity: any }) => {
      for (let quant of this.cartItems) {
        if (quant._id == data.productId) {
          quant.quantity = data.quantity;
        }
      }
      this.show();
    }
 
 
 
 
  )

}

remove(product){
    var cartId =localStorage.getItem('cartId');
    this.cart.removeProduct(product,cartId).subscribe(
      data =>  {
          this.getTotalQuantity(cartId);
          this.getItemsQuantity(product._id, cartId);
        }
    )

    this.cart.itemQuantity.subscribe(
      (values :{ quantity : any}) => this.totalItems = values.quantity
    );

    this.cart.productQuantity.subscribe(
      (data: { productId: any, quantity: any
      }) => {
        for (let quant of this.cartItems) {
          if (quant._id == data.productId) {
            quant.quantity = data.quantity;
          }
        }
        this.show();
      }
    )
}


clearCart()
{
  var cartId =localStorage.getItem('cartId');
  this.cart.clearCart(cartId).subscribe(
    data =>   {
        this.getTotalQuantity(cartId);
        for(var product of this.cartItems)
        {
          this.getItemsQuantity(product._id, cartId);
        }
      }
  )
  
  this.cart.itemQuantity.subscribe(
    (values :{ quantity : any}) => this.totalItems = values.quantity
  );

  this.cart.productQuantity.subscribe(
    (data: { productId: any, quantity: any
    }) => {
      for (let quant of this.cartItems) {
        if (quant._id == data.productId) {
          quant.quantity = data.quantity;
        }
      }
      this.show();
    }
  )


}

  getTotalQuantity(cartId) {
    this.cart.fetchTquantity(cartId).subscribe(
      data => this.cart.itemQuantity.next({ quantity: data.json().quantity })
    )
  }

  getItemsQuantity(productId, cartId) {
    this.cart.fetchProduct(productId, cartId).subscribe(
      data =>{
            this.cart.productQuantity.next({ productId: data.json().product, quantity: data.json().quantity })
              }
    )
  }


}
