import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product';
import { Observable } from 'rxjs'; 

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = 'https://smart-inventory-system-api.onrender.com/api/products';

  constructor(private http: HttpClient) { }

  getProducts() {
    return this.http.get<Product[]>(this.apiUrl);
  }

   createProduct(product: Omit<Product, 'id'>): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, product);
  }

  deleteProduct(id: number): Observable<void> {
  // We construct the URL like: http://localhost:8080/api/products/1
  return this.http.delete<void>(`${this.apiUrl}/${id}`);
}
}