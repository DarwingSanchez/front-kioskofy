import { CurrencyPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-card-mini',
  templateUrl: './card-mini.component.html',
  styleUrls: ['./card-mini.component.css']
})
export class CardMiniComponent implements OnInit {
  // Card favorite
  public is_liked_by_user: boolean = false;

  constructor(private currencyPipe: CurrencyPipe) {}

  ngOnInit(): void {
    this.is_liked_by_user = Math.random() < 0.5;
  }

  /**
   * Add the card as favorite for the user
   */
  likedCard(){
    this.is_liked_by_user = !this.is_liked_by_user;
  }
}
