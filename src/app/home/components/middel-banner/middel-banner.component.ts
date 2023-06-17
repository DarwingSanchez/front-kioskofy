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
  selector: 'app-middel-banner',
  templateUrl: './middel-banner.component.html',
  styleUrls: ['./middel-banner.component.css']
})
export class MiddelBannerComponent implements OnInit {
  // Saved the info to show on the DOM
  public middel_banners: any;
  // Swiper configuration for principal banneR
  public my_swipe: SwiperOptions = {
    slidesPerView: 1,
    pagination: {
      clickable: true,
      type: 'bullets',
    },
    autoplay: {
      delay: 3000,
    },
    navigation: true,
    loop: true,
    speed: 3000,
    centeredSlides: true,
    centeredSlidesBounds: true
  };

  constructor() { }
  
  ngOnInit(): void {
    console.log('TODO: Servicio para traer info middel banner');
    // DUMMY DATA
    this.middel_banners = {
      title_main: "Latino ayuda a latino \n Latino ayuda a latino \n Latino ayuda a latino \n",
      title_sub: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nobis at dolores, cum quibusdam voluptatem tenetur eaque vero quos omnis debitis quod porro magnam maxime, optio animi ipsam commodi, reprehenderit quam.!",
      link_to: "wwww.google.com",
      images: [
        'https://picsum.photos/id/700/900/500',
        'https://picsum.photos/id/533/900/500',
        'https://picsum.photos/id/807/900/500',
        'https://picsum.photos/id/124/900/500',
      ]
    }
  }
}
