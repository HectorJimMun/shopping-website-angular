import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Product } from '../../models/product.model';
import { Router } from '@angular/router';
import { CartServiceService } from '../../services/cart-service.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {

  productList: Product[] = [];
  private _apiService = inject(ApiService);
  private _router = inject(Router);
  private _cartService = inject(CartServiceService);

  /* Gets all the products using the service. */
  ngOnInit(): void {
    this._apiService.getProducts().subscribe((data: Product[]) => {
      this.productList = data;
    });
  }

  /**
   * Changes the view to show the details of the specified product.
   * @param {number} id ID of the product.
   */
  showDetails(id: number): void {
    this._router.navigate(['/products', id]);
  }

  /**
   * Adds a product to the cart.
   * @param {Product} product Product object.
   */
  addProductToCart(product: Product) {
    this._cartService.addProductToCart(product);
  }
}
