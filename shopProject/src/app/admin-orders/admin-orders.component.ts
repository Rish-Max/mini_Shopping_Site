import { Component, OnInit } from '@angular/core';
import { orderService } from 'src/app/order.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent implements OnInit {


  Orderlist = [];
  show : boolean = false;
  products = [];
  totalAmount = 0; 
  shipping = {};
  
    constructor(private order : orderService,private modalService: NgbModal) {
        
     }
  
    ngOnInit() {
         this.order.adminOrder().subscribe(
           data => {this.Orderlist = data.json().order;
                    console.log(this.Orderlist)}
         )
    }
  
  showOrder(event,content)
  {
    
    this.modalService.open(content,{ centered: true });
    this.order.checkOrder(event.target.id).subscribe(
      data =>{ this.products = data.json().order.products;
               this.shipping = data.json().order.shipping;
              for (let product of this.products) {
                this.totalAmount += product.quantity * product.price;
              }
            }
    )
    
    
  }
  
}
