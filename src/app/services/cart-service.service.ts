import { Injectable, OnInit } from '@angular/core';
import { Product, CartProduct } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartServiceService implements OnInit {

  private _localStorageKey = 'cartProducts';
  private totalAmount: number = 0;

  ngOnInit(): void {
    this.updateTotalAmount();
  }

  // Gets all the products stored in the local storage
  getCartProducts() {
    return JSON.parse(localStorage.getItem(this._localStorageKey) as string) || [];
  }

  /**
   * Adds a product to the local storage to simulate the cart of a user.
   * @param {Product} product Product to be added.
   */
  addProductToCart(product: Product) {
    const cartProducts = this.getCartProducts();
    var productInCart: boolean = false;
    var newCartProduct: CartProduct = {id: 0, title:'', price: 0, units: 0};
    var idxToUpdate = 0;
  
    if (cartProducts.length > 0) {
      // Loop items in current cart
      for(const cartProduct of cartProducts) {
        if (!productInCart){
          // If item currently in cart, increase units
          if (cartProduct.id == product.id) {
              newCartProduct.id = product.id;
              newCartProduct.title = product.title;
              newCartProduct.price = product.price;
              newCartProduct.units = cartProduct.units + 1;
              productInCart = true;
          }
          else {
            newCartProduct.id = product.id;
            newCartProduct.title = product.title;
            newCartProduct.price = product.price;
            newCartProduct.units = 1;
            idxToUpdate++;
          }
        }
      }
    }
    else {
      newCartProduct.id = product.id;
      newCartProduct.title = product.title;
      newCartProduct.price = product.price;
      newCartProduct.units = 1;
    }

    // Add or update product in the cart when necessary
    if (productInCart) {
      cartProducts[idxToUpdate] = newCartProduct;
    }
    else {
      cartProducts.push(newCartProduct);
    }

    // Update the local storage item
    localStorage.setItem(this._localStorageKey, JSON.stringify(cartProducts));

    this.updateTotalAmount();
  }

  /**
   * Removes the product from the cart using the given ID.
   * @param {number} id ID of the product.
   */
  removeProductFromCart(id: number) {
    const cartProducts = this.getCartProducts();
    var idxToRemove = 0;
    var productInCart: boolean = false;

    for(const cartProduct of cartProducts) {
      if (!productInCart) {
        if (cartProduct.id == id) {
          productInCart = true;
        }
        else {
          idxToRemove++;
        }
      }
    }
    
    cartProducts.splice(idxToRemove, 1);

    // Update the local storage item
    localStorage.setItem(this._localStorageKey, JSON.stringify(cartProducts));

    this.updateTotalAmount();
  }

  /**
   * Returns the total amount of the cart.
   * @returns {number} Total amount.
   */
  getTotalAmount(): number {
    this.updateTotalAmount();
    return this.totalAmount;
  }

  // Computes the total amount of the cart iterating through the items.
  updateTotalAmount() {
    const cartProducts = this.getCartProducts();
    this.totalAmount = 0;
    if (cartProducts.length > 0) {
      for(const cartProduct of cartProducts) {
        this.totalAmount += cartProduct.price * cartProduct.units;
      }
    }
  }

  // Empties the cart.
  emptyCart() {
    // Update the local storage item
    localStorage.setItem(this._localStorageKey, JSON.stringify(""));
  }
}
