import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-status',
  templateUrl: './cart-status.component.html',
  styleUrls: ['./cart-status.component.css']
})
export class CartStatusComponent implements OnInit {
  totalPrice: number = 0.00;
  totalQuantity: number = 0;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.updateCartStatus();
  }
  updateCartStatus() {
   
    // SUB TO events

    this.cartService.totalPrice.subscribe(
      data => this.totalPrice = data
    );

    // SUB TO the cart totalQuantity

    this.cartService.totalQuantity.subscribe(
      data => this.totalQuantity = data
    );

  }

}
