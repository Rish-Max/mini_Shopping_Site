import { Component, OnInit,DoCheck,OnDestroy } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
//import { HttpClient,HttpHeaders } from '@angular/common/http';
// import { AuthService } from "angularx-social-login";
// import { GoogleLoginProvider,SocialUser } from "angularx-social-login";
import { ActivatedRoute } from '@angular/router';
import { AdminService } from 'src/app/admin.service';
import { CartService } from 'src/app/cart.service';
import { CategoryService } from 'src/app/category.service';
import "rxjs/add/operator/take";
import "rxjs/add/operator/switchMap";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit,OnDestroy {

  products = [];
  filterProduct = [];
  categories = [];
  Quantity: { productId: any, quantity: any }[] = [];
  type;
  productQuantity: [{ productId: string, quantity: number }];
  isCollapsed=false;
  showButton = false;

  constructor(private itemList: AdminService,
    private category: CategoryService,
    private route: ActivatedRoute,
    private cart: CartService) {
  }

  ngOnInit() {
   if(window.screen.width <= 1000)
   {
     this.isCollapsed=true;
     this.showButton=true;
   }
   else
   {
    this.isCollapsed=false;
    this.showButton=false;
   }
    this.category.categoryFetch().take(1).subscribe(
      data => {
        var i = 0;
        for (var obj of data.json()) {
          this.categories[i++] = obj;
        }
      },
      err => console.log(err)
    );
    var id = localStorage.getItem('cartId');
    this.itemList.viewAllproducts().switchMap(
      (data) => {
        var i = 0;
        for (var obj of data.json()) {
          this.products[i++] = obj;
          if (!id) {
            this.Quantity.push({ productId: obj._id, quantity: 0 });
          }
          else {
            this.pushQuantity(obj._id, localStorage.getItem('cartId'));
          }
        }
        if(id)
        {
          this.getTotalQuantity(id);
        }
        this.filterProduct = this.products;
        return this.route.queryParamMap;
      }
    ).subscribe(
      params => {
        this.type = params.get('category');

        this.filterProduct = (this.type) ?
          this.products.filter((product) => {
            return this.type == product.category;
          }) : this.products;
      });
  }
  


  addToCart(product) {

    var id = localStorage.getItem('cartId');
    if (!id) {
      this.cart.createAndAdd(product).subscribe(
        data => {
          localStorage.setItem('cartId', data.json().cartId);
          this.getTotalQuantity(localStorage.getItem('cartId'));
          this.getItemsQuantity(product._id, localStorage.getItem('cartId'));
        },
        err => console.log(err)
      )
    }
    else {
      this.cart.addproduct(product, localStorage.getItem('cartId')).subscribe(
        data => {
          console.log(data)
          this.getTotalQuantity(localStorage.getItem('cartId'));
          this.getItemsQuantity(product._id, localStorage.getItem('cartId'));
        }
      )
    }

    this.cart.productQuantity.subscribe(
      (data: { productId: any, quantity: any }) => {
        for (let quant of this.Quantity) {
          if (quant.productId == data.productId) {
            quant.quantity = data.quantity;
          }
        }
      }
    )
  }



removeProduct(product){
  var cartId =localStorage.getItem('cartId');
  this.cart.removeProduct(product,cartId).subscribe(
    data =>  {console.log(data);
        this.getTotalQuantity(cartId);
        this.getItemsQuantity(product._id, cartId);
      }
  )
  this.cart.productQuantity.subscribe(
    (data: { productId: any, quantity: any }) => {
      for (let quant of this.Quantity) {
        if (quant.productId == data.productId) {
          quant.quantity = data.quantity;
        }
      }
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

  pushQuantity(productId, cartId) {
    this.cart.fetchProduct(productId, cartId).subscribe(
      data =>  {
          this.Quantity.push({productId: data.json().product, quantity: data.json().quantity })
          }
     )
  }

ngOnDestroy(){

}

}
// change($event){
//
//  let user ={
//    email : '',
//    pass  : ''
//  }
//
//   let headers = new HttpHeaders();
//   headers.append('Access-Control-Allow-Origin','*');
//   headers.append('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//   headers.append('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS');
//
//    this.http.post("http://localhost:3000/auth/google",user,{
//      headers : headers
//    })
//    .subscribe(
//     data => console.log(data),
//     err => console.log(err)
//    )
// }
//    private user: SocialUser;
//    private loggedIn: boolean;
//    private authService: AuthService ----->constructor
//  signInWithGoogle(): void {
//    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
//    this.authService.authState.subscribe((user) => {
//      this.user = user;
//      this.loggedIn = (user != null);
//       console.log(this.user);
//    });
//
//  }
//
// show(){
//
// }
