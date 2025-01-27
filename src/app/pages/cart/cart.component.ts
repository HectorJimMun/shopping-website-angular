import { AfterViewChecked, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartServiceService } from '../../services/cart-service.service';
import { CartProduct } from '../../models/product.model';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit, AfterViewChecked {
  productCart: CartProduct[] = [];
  totalAmount = 0;
  checkedOut: boolean = false;

  private _cartService = inject(CartServiceService);

  // Initialises the component
  ngOnInit(): void {
    this.productCart = this._cartService.getCartProducts();
    this.totalAmount = this._cartService.getTotalAmount();
    this.checkedOut = false;
  }

  // Triggers the update of the total amount
  ngAfterViewChecked(): void {
    this.totalAmount = this._cartService.getTotalAmount();
  }

  /**
   * Returns the total amount of the cart.
   * @returns {number} Total amount.
   */
  getTotalAmount(): number {
    return this._cartService.getTotalAmount();
  }

  // Empties the cart.
  emptyCart() {
    this._cartService.emptyCart();
    this.ngOnInit();
  }

  // Simulates the checkout of the cart.
  proceedToCheckout() {
    this._cartService.emptyCart();
    this.ngOnInit();
    this.checkedOut = true;
  }

  /**
   * Removes the product from the cart.
   * @param {number} id ID of the product to remove.
   */
  removeItem(id: number) {
    this._cartService.removeProductFromCart(id);
    this.ngOnInit();
  }
}
