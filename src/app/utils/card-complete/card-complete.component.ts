import { CurrencyPipe } from '@angular/common';
import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Category } from 'src/app/core/interfaces/category.interface';
import { Country } from 'src/app/core/interfaces/country.interface';
import { Product } from 'src/app/core/interfaces/product.interface';

@Component({
  selector: 'app-card-complete',
  templateUrl: './card-complete.component.html',
  styleUrls: ['./card-complete.component.css']
})
export class CardCompleteComponent implements OnInit, OnChanges {
  @Input() portfolio!: Product;
  @Input() category!: Category;
  @Input() country!: Country;
  @Input() show_swiper: boolean = false;
  public price = 0;
  public is_liked_by_user: boolean = false;

  ngOnInit(): void {
    this.is_liked_by_user = Math.random() < 0.5;
  }

  ngOnChanges(): void {
    // In case the price comes with the currency it must be corrected
    if (this.portfolio && this.portfolio.price)
      this.price = parseInt(this.portfolio.price.toString().replace(/[CA$,.]/g, ''));
  }

  // Add the card as favorite for the user
  likedCard(){
    this.is_liked_by_user = !this.is_liked_by_user;
  }
}
