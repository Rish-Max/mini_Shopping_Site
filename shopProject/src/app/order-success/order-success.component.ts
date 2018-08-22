import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router'; 
import { orderService } from 'src/app/order.service';

@Component({
  selector: 'app-order-success',
  templateUrl: './order-success.component.html',
  styleUrls: ['./order-success.component.css']
})
export class OrderSuccessComponent implements OnInit {

products = [];
shipping = {};
date ;

  constructor( private route : ActivatedRoute,private router : Router,private order :orderService) {
      this.route.params.subscribe(
      param => {
        this.order.checkOrder(param.id).subscribe(
          data =>{
            if(!data.json().order)
            {
              this.router.navigate(['/'])
            }
            else{
               this.products = data.json().order.products;
               this.shipping = data.json().order.shipping;
               this.date = data.json().order.date;      
               console.log(data.json());  
            }   
          },
          err =>  console.log(err)
        )
      }
    );
   }

  ngOnInit() {

  }

}
