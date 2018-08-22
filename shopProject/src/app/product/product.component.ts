import { Component, OnInit,Input,DoCheck } from '@angular/core';
import { CartService } from 'src/app/cart.service';
import { Subscription } from 'Rxjs/Subscription';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

@Input('product') Product;
 sub : Subscription;
 value  ;
 productId ;
  constructor(private cart : CartService) { }

  ngOnInit() {


  }


  getValues(product)
  {
    var id =localStorage.getItem('cartId');
    if(id)
    {
      this.cart.fetchProduct(product,id).subscribe(
        data => this.cart.productQuantity.next({productId : data.json().productId , quantity : data.json().quantity})
      )
    }
  }

  ngDoCheck(){
   this.cart.productQuantity.subscribe(
    (data :{productId:any ,quantity : any }) => {this.value = data.quantity; this.productId = data.productId}
   )
  }


  addToCart(product)
 {
   var id = localStorage.getItem('cartId');
   if(!id)
     {
      this.cart.createAndAdd(product).subscribe(
        data =>{
          localStorage.setItem("cartId",data.json().cartId);
          this.cart.fetchTquantity(data.json().cartId).subscribe(
            data => {this.cart.itemQuantity.next({quantity : data.json().quantity });
                      this.getValues(product._id)}
          )
               }
             )
     }
     else
     {
       this.cart.addproduct(product,localStorage.getItem('cartId')).subscribe(
         data =>{console.log(data)
           this.cart.fetchTquantity(localStorage.getItem('cartId')).subscribe(
             data => {this.cart.itemQuantity.next({quantity : data.json().quantity })
                      this.getValues(product._id)}
           )
         }
       )
 }

 }


ngOnDestroy(){

}

}
