import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-portfolio-detail-data',
  templateUrl: './portfolio-detail-data.component.html',
  styleUrls: ['./portfolio-detail-data.component.css']
})
export class PortfolioDetailDataComponent implements OnInit {
  @Input() portfolio!: any;

  constructor() { }

  ngOnInit(): void {
  }

}

