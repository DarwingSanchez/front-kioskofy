import { Component, Input } from '@angular/core';
import SwiperCore, {
  Navigation,
  Pagination,
  Swiper,
  SwiperOptions,
  Autoplay,
} from 'swiper';
SwiperCore.use([Navigation, Pagination, Autoplay]); // install Swiper modules
import { Banner } from 'src/app/interfaces/banner.interface';

@Component({
  selector: 'app-swiper',
  templateUrl: './swiper.component.html',
  styleUrls: ['./swiper.component.css']
})
export class SwiperComponent {
  // Data from parent
  @Input() aspect_ratio: string = '5 / 1';
  @Input() banners: Banner[] = [];
  @Input() swiper_navigation: boolean = false;
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
    navigation: this.swiper_navigation,
    loop: true,
    speed: 1000,
    centeredSlides: true,
    centeredSlidesBounds: true
  };
}
