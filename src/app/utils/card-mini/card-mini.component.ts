import { CurrencyPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-card-mini',
  templateUrl: './card-mini.component.html',
  styleUrls: ['./card-mini.component.css']
})
export class CardMiniComponent implements OnInit {

  constructor(private currencyPipe: CurrencyPipe) {}

  ngOnInit(): void {
  }

}
