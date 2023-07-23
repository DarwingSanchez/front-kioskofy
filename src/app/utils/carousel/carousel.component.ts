import { Component, Input, OnInit } from '@angular/core';
import SwiperCore, {
  Navigation,
  Pagination,
  Swiper,
  SwiperOptions,
  Autoplay,
} from 'swiper';
@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent {
  // Inputs from parent
  @Input() portfolio_type: string = "";
  @Input() isBannerShown: boolean = false;
  // Store the portfolio to print on each card
  public portfolio = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 11, 12, 13, 14, 15, 16, 23, 4, 4,4 ,4,4,4 , 4,4 , 4,4 ,4 ,4 ,4 ];
  public banners_cards = [
    'https://swapp-recursos.s3.amazonaws.com/cpX3oD2K2enfCkE4.jpg',
    'https://swapp-recursos.s3.amazonaws.com/pfoRdKn0ikJwEVQ3.jpg',
    'https://swapp-recursos.s3.amazonaws.com/HIL6hSX5nQtgG8u1.jpg',
    'https://swapp-recursos.s3.amazonaws.com/USC7dxVn1Eh0klU8.jpg'
  ];
  public mySwiperCars: SwiperOptions = {
    slidesPerView: 1,
    spaceBetween: 10,
    pagination: {
      clickable: true,
      type: 'bullets',
    },
    autoplay: {
      delay: 3000,
    },
    loop: false,
    speed: 1000,
  };

  constructor() {/** */}

  /**
   * Scroll a HTML element to a require side
   * @param side side to scroll the div
   * @param nativeElement the HTML element to scroll
   */
  scrollContainer(side: string, nativeElement: any, length: number){
    if (side == 'left') {
      nativeElement.scrollTo({ left: (nativeElement.scrollLeft - length), behavior: 'smooth' });
    } else {
      nativeElement.scrollTo({ left: (nativeElement.scrollLeft + length), behavior: 'smooth' });
    }
  }
}
