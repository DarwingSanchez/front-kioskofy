import { Component, OnInit } from '@angular/core';
import SwiperCore, {
  Navigation,
  Pagination,
  Swiper,
  SwiperOptions,
  Autoplay,
} from 'swiper';
SwiperCore.use([Navigation, Pagination, Autoplay]); // install Swiper modules

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css'],
})
export class BannerComponent implements OnInit {
  // Swiper configuration for principal banneR
  public my_swipe: SwiperOptions = {
    slidesPerView: 1,
    spaceBetween: 16,
    pagination: {
      clickable: true,
      type: 'bullets',
    },
    autoplay: {
      delay: 3000,
    },
    navigation: true,
    loop: true,
    speed: 1000,
    centeredSlides: true,
    centeredSlidesBounds: true
  };

  constructor() { }
  
  ngOnInit(): void {
    console.log("TODO: incluir servicio banners");
  }

  // DUMMY DATA
  products = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 11, 12, 13, 14, 15, 16, 23, 4, 4,4 ,4,4,4 , 4,4 , 4,4 ,4 ,4 ,4 ];
  banners = [
    {url: 'https://swapp-recursos.s3.amazonaws.com/dzYMN9U7siZOXdS2.jpg'},
    {url: 'https://swapp-recursos.s3.amazonaws.com/AgYXEmMl4Ub1mqc7.jpg'},
    {url: 'https://swapp-recursos.s3.amazonaws.com/5ohCOINH8q2aMKM9.jpg'},
    {url: 'https://swapp-recursos.s3.amazonaws.com/7NSv74SR6c5x92g10.jpg'},
    {url: 'https://swapp-recursos.s3.amazonaws.com/XucubtFPJGRl3Yh1.jpg'},
    {url: 'https://swapp-recursos.s3.amazonaws.com/ljGIm5LZUqC6kAE3.jpg'},
  ]
}
