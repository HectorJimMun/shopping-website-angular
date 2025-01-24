import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { Product } from '../../models/product.model';

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
}
