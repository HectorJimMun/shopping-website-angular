import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { Product } from '../../models/product.model';
import { CartServiceService } from '../../services/cart-service.service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent implements OnInit {

  private _routerActive = inject(ActivatedRoute);
  private _apiService = inject(ApiService);
  private _cartService = inject(CartServiceService);
  public product?: Product;
  loading: boolean = true;

  ngOnInit(): void {
    this._routerActive.params.subscribe(params => {
      this._apiService.getProduct(params['id']).subscribe((data: Product) => {
        this.product = data;
        this.loading = false;
      });
    });
  }

  // Adds the product to the cart.
  addProductToCart() {
    if (this.product) {
      this._cartService.addProductToCart(this.product);
    }
  }
}
