import { Injectable } from '@angular/core';
import { Http,Response } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: Http) { }

categoryFetch(){
 return  this.http.get('http://localhost:3000/admin/category/fetch');
}

}
