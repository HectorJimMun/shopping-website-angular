import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl: string = "https://fakestoreapi.com/products";
  private _http = inject(HttpClient);

  getProducts(): Observable<Product[]> {
    return this._http.get<Product[]>(this.baseUrl);
  }

  getProduct(idx: number): Observable<Product> {
    return this._http.get<Product>(`${this.baseUrl}/${idx}`);
  }
}
