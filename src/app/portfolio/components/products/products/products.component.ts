import { Component, OnInit } from '@angular/core';
import { Banner } from 'src/app/interfaces/banner.interface';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  // Paginator
  public current_page: number = 1;
  public total_pages: number = 1;
  // Banners
  public banners: Banner[] = [];

  constructor() { }

  ngOnInit(): void {
    try {
      this.getBanners();
      this.getPortfolio();
    } catch (error) {
      console.log(error);
      
    }
  }

  private getPortfolio() {
        /*******BORRAR! */
    this.total_pages = 5;
  }

  private getBanners() {
    // DUMMY DATA
    this.banners = [
      {url: 'https://swapp-recursos.s3.amazonaws.com/dzYMN9U7siZOXdS2.jpg'},
      {url: 'https://swapp-recursos.s3.amazonaws.com/AgYXEmMl4Ub1mqc7.jpg'},
      {url: 'https://swapp-recursos.s3.amazonaws.com/5ohCOINH8q2aMKM9.jpg'},
      {url: 'https://swapp-recursos.s3.amazonaws.com/7NSv74SR6c5x92g10.jpg'},
      {url: 'https://swapp-recursos.s3.amazonaws.com/XucubtFPJGRl3Yh1.jpg'},
      {url: 'https://swapp-recursos.s3.amazonaws.com/ljGIm5LZUqC6kAE3.jpg'},
    ]
  }

  public onGoToPage(event: any) {
    console.log(event);
    
  }
  // Store the portfolio to print on each card
  public portfolio = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24 ];
}
