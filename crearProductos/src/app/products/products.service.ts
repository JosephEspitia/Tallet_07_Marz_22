import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from './products.model';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  selectedProduct: Product;
  products: Product[];
  url_api = `${environment.API_URL}/products`

  constructor(private http: HttpClient) {
    this.selectedProduct = new Product,
    this.products = []
   }

  getProduct() {
     return this.http.get(`${this.url_api}/get-products`) 
   }
  postProduct(products:Product) {
    return this.http.post(`${this.url_api}/create-product`, products)
  }
  deleteProduct(_id:any) {
    return this.http.delete(`${this.url_api}/delete-product/${_id}`)
  }
}
