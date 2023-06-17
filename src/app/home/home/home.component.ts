import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  banner_interval:any;
test: any = "__________"

  constructor() {
      this.banner_interval = setInterval(() => this.test6(), 1000);
  }
  products = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 11, 12, 13, 14, 15, 16, 23, 4, 4,4 ,4,4,4 , 4,4 , 4,4 ,4 ,4 ,4 ];
  ngOnInit(): void {
  }
  scrollLeft(){
    this.container_products.nativeElement.scrollLeft -= 150;
  }
// container_products: any;
  scrollRight(){
    console.log(this.container_products.nativeElement.scrollLeft);
    console.log(this.container_products.nativeElement.offsetWidth);
    
    this.container_products.nativeElement.scrollLeft += 150;
  }
  flag_direc_scroll_prod: string = 'right';
  scrollProducts(distance: number){
    console.log(this.container_products.nativeElement.scrollLeft);
    console.log(this.container_products.nativeElement.offsetWidth);
    this.container_products.nativeElement.scrollLeft += distance;
  }
  test6(){
    if (this.flag_direc_scroll_prod == 'right' && this.container_products.nativeElement.scrollLeft > this.container_products.nativeElement.offsetWidth) {
      this.flag_direc_scroll_prod = 'left';
    } else if (this.flag_direc_scroll_prod == 'left' && this.container_products.nativeElement.scrollLeft < 0) {
      this.flag_direc_scroll_prod = 'right';
    }
    if (this.flag_direc_scroll_prod == 'right') {
      this.scrollProducts(5);
    } else if (this.flag_direc_scroll_prod == 'left') {
      this.scrollProducts(-5);
    }
    
  }
// @ViewChild('container_products')
// container_products: ElementRef;
  @ViewChild('container_products', { static: true })
  public container_products!: ElementRef;
  @ViewChild('container_categories', { static: true })
  public container_categories!: ElementRef;
    scrollCategories(side: string){
      console.log('entra', side);
      console.log('this.container_categories.nativeElement', this.container_categories.nativeElement.scroll.target);
      // console.log('this.container_categories.nativeElement', this.container_categories.nativeElement.target[scrollTop]);
      
      if (side == 'left') {
        this.container_categories.nativeElement.scrollLeft -= 150;
      } else {
        this.container_categories.nativeElement.scrollLeft += 150;
      }
  }
  }