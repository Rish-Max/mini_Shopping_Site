import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http:Http) { }

addProduct(form)
{
  return this.http.post('http://localhost:3000/admin/addProduct',form);
}

viewAllproducts()
{
  return this.http.get('http://localhost:3000/admin/fetchProduct');
}

view(id)
{
  return this.http.get('http://localhost:3000/admin/fetchProduct/' + id);
}

updateProduct(form)
{
  return this.http.post('http://localhost:3000/admin/updateProduct',form);
}

deleteProduct(id)
{
  return this.http.delete('http://localhost:3000/admin/deleteProduct/'+ id);
}
}
