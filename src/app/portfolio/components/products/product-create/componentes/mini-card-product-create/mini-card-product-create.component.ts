import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-mini-card-product-create',
  templateUrl: './mini-card-product-create.component.html',
  styleUrls: ['./mini-card-product-create.component.css']
})
export class MiniCardProductCreateComponent implements OnInit {
  // Input parent
  @Input() pre_card_info: any = {
    name: "Your product",
    image: "../../../../../assets/placeholder/product.png",
    price: 0,
    quantity: 1,
    measure: "Un",
    country: "https://flagsapi.com/BE/flat/16.png",
  };

  constructor() { }

  ngOnInit(): void {
  }

}
