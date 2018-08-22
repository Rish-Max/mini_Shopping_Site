import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { HomeComponent } from './home/home.component';
import { Routes, RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { NgProgressModule } from 'ngx-progressbar';
// import { SocialLoginModule, AuthServiceConfig } from "angularx-social-login";
// import { GoogleLoginProvider} from "angularx-social-login";
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ServerService } from 'src/app/sever.service';
import { AuthService } from 'src/app/auth-service.service';
import { AdminAuth } from 'src/app/admin-auth.service';
import { AdminService } from 'src/app/admin.service';
import { CategoryService } from 'src/app/category.service';
import { CartService } from 'src/app/cart.service';
import { orderService } from 'src/app/order.service';
import { CheckOutComponent } from './check-out/check-out.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { MyOrderComponent } from './my-order/my-order.component';
import { AdminProductsComponent } from './admin-products/admin-products.component';
import { AdminOrdersComponent } from './admin-orders/admin-orders.component';
import { ProductFormComponent } from './product-form/product-form.component';
import { ProductComponent } from './product/product.component';



const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'cart', component: ShoppingCartComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signUp', component: SignupComponent },
  { path: 'check-out', component: CheckOutComponent, canActivate :[AuthService] },
  { path: 'order-success/:id', component: OrderSuccessComponent, canActivate :[AuthService]},
  { path: 'my/order', component: MyOrderComponent, canActivate :[AuthService]},
  { path: 'admin/orders', component: AdminOrdersComponent,canActivate :[AuthService,AdminAuth]},
  { path: 'admin/products/new', component: ProductFormComponent,canActivate :[AuthService,AdminAuth]},
  { path: 'admin/products/:id', component: ProductFormComponent,canActivate :[AuthService,AdminAuth]},
  { path: 'admin/products', component: AdminProductsComponent,canActivate :[AuthService,AdminAuth] },
  { path: '**', component: HomeComponent }
];

// let config = new AuthServiceConfig([
//   {
//     id: GoogleLoginProvider.PROVIDER_ID,
//     provider: new GoogleLoginProvider("1068776697679-ff3fb070ra9r63f3m62lqg6eevgk2oq2.apps.googleusercontent.com")
//   },
//
// ]);
//
// export function provideConfig() {
//   return config;
//provider ------>{
  //   provide: AuthServiceConfig,
  //   useFactory: provideConfig
  // }
// }

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ShoppingCartComponent,
    HomeComponent,
    LoginComponent,
    SignupComponent,
    CheckOutComponent,
    OrderSuccessComponent,
    MyOrderComponent,
    AdminProductsComponent,
    AdminOrdersComponent,
    ProductFormComponent,
    ProductComponent
  ],
  imports: [
    FormsModule,
    NgbModule.forRoot(),
    BrowserModule,
    HttpModule,
    NgProgressModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [ServerService,AuthService,AdminAuth,CategoryService,AdminService,CartService,orderService],
  bootstrap: [AppComponent]
})
export class AppModule { }
