import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/admin.service';
import 'rxjs/add/operator/take';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit {

 products:any[]= [];
filterProducts =[];

 constructor( private fetchProduct:AdminService) { }

  ngOnInit() {
    this.fetchProduct.viewAllproducts().take(1).subscribe(
      (data) =>{
        var i = 0;
        for(var obj of data.json())
        {
         this.products[i] =obj;
         i++;
        }
        this.filterProducts = this.products;
      },
      (err) =>console.log(err)
    );
  }

search(input)
{
 if(input.value){
   this.filterProducts = this.products.filter((product) =>{
     return product.title.includes(input.value.toLowerCase());
   })
 }
  else
  {
    this.filterProducts = this.products;
  }
}

sortByValue()
{
   this.filterProducts.sort(( a : any, b: any) => {
     return a.price - b.price;
   });
   console.log(this.filterProducts);
}

reverseByName()
{
   this.filterProducts.sort(( a : any, b: any) => {
    let nameA=a.title.toLowerCase()
    let nameB=b.title.toLowerCase()
    if(nameA > nameB)
    {
      return -1;
    }
    else if(nameA < nameB)
    {
      return 1;
    }
    else{
      return 0;
    }
   });
   console.log(this.filterProducts);
}

sortByName()
{
   this.filterProducts.sort(( a : any, b: any) => {
    let nameA=a.title.toLowerCase()
    let nameB=b.title.toLowerCase()
    if(nameA > nameB)
    {
      return 1;
    }
    else if(nameA < nameB)
    {
      return -1;
    }
    else{
      return 0;
    }
   });
   console.log(this.filterProducts);
}

}
