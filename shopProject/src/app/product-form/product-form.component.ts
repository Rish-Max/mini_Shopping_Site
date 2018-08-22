import { Component, OnInit, OnDestroy } from '@angular/core';
import { CategoryService } from 'src/app/category.service';
import { AdminService } from 'src/app/admin.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgProgress } from 'ngx-progressbar';
import 'rxjs/add/operator/take';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})

export class ProductFormComponent implements OnInit {

  check: boolean = false;
  serverError: boolean = false;
  fileError: boolean = false;
  itemList: any = [];
  title = "";
  price = "";
  category = "";
  image: any;
  path = "";
  url = "assets/images/defaultImage.jpg";
  id : boolean = false;
  disableButton = false;
  constructor(private categories: CategoryService,
     private product: AdminService,
     private router: Router,
     private route: ActivatedRoute,
     private ngprogress : NgProgress) { }

  ngOnInit() {
    this.categories.categoryFetch().take(1).subscribe(
      (res) => {
        var i: number = 0;
        for (let obj of res.json()) {
          this.itemList[i++] = obj;
        };
      },
      (err) => console.log('err')
    );
    let id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.id = true;
      this.product.view(id).take(1).subscribe(data => {
        this.title = data.json().title;
        this.price = data.json().price;
        this.category = data.json().category;
        this.url = "https://rishabh-images.s3.amazonaws.com/" + data.json().imagePath;
      },
        err => console.log(err)
      )
    }

  }


  imagePath(event) {
    this.image = event.target.files[0];
    if (event.target.files.length > 0) {
      this.check = false;
      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.url = event.target.result;
      }
      reader.readAsDataURL(event.target.files[0]);
    }
    else {
      this.url = "assets/images/defaultImage.jpg";
      this.check = true;
    }
  }

  onClick() {
    this.ngprogress.start();
    this.disableButton = true;
    var form = new FormData();
    //form.append('Path',this.image,this.image.name);
    form.set('Path', this.image);
    form.set('title', this.title);
    form.set('price', this.price);
    form.set('category', this.category);

    let id = this.route.snapshot.paramMap.get('id');
    if (id) {
      form.set('id', id);
      this.product.updateProduct(form).take(1).subscribe(
        (data) => {
          this.ngprogress.done();
          if (data.json().message == "Internal Server Error") {
            this.serverError = true;
            this.fileError = false;
            this.disableButton = false;
          }
          if (data.json().message == "Not an Image") {
            this.serverError = false;
            this.fileError = true;
            this.disableButton = false;
          }
          else {
            this.router.navigate(['/admin/products']);
          }
        },
        (err) => {
          this.ngprogress.done();
          this.serverError = true;
          this.fileError = false;
          this.serverError = false;
          this.disableButton = false;
        }
      );
    }
    else {
      this.product.addProduct(form).take(1).subscribe(
        (data) => {
          this.ngprogress.done();
          if (data.json().message == "Internal Server Error") {
            this.serverError = true;
            this.fileError = false;
          this.disableButton = false;
          }
          if (data.json().message == "Not an Image") {
            this.serverError = false;
            this.fileError = true;
            this.disableButton = false;
          }
          else {
            this.router.navigate(['/admin/products']);
          }
        },
        (err) => {
          this.ngprogress.done();
          this.serverError = true;
          this.fileError = false;
          this.serverError = false;
          this.disableButton = false;
        }
      );
    }
  }

onDelete(){
  let id = this.route.snapshot.paramMap.get('id');
  if(confirm("Do u wanna delete this"))
  {
    this.product.deleteProduct(id).take(1).subscribe(
      (data) => {
        if(data.statusText == "Successfully Deleted")
        {
          this.router.navigate(['/admin/products']);
        }
      },
      err => console.log(err)
    );
  }
}

}
