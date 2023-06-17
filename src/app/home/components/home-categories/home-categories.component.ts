import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import SwiperCore, {
  Navigation,
  Pagination,
  Swiper,
  SwiperOptions,
  Autoplay,
} from 'swiper';
SwiperCore.use([Navigation, Pagination, Autoplay]); // install Swiper modules

@Component({
  selector: 'app-home-categories',
  templateUrl: './home-categories.component.html',
  styleUrls: ['./home-categories.component.css']
})
export class HomeCategoriesComponent implements OnInit {
  // Elements HTML
  @ViewChild('container_categories', { static: true })
  public container_categories!: ElementRef;

  constructor() {}
  
  ngOnInit(): void {
    console.log('TODO: servicio traer categorias mas importantes');
  }
  
  scrollCategories(side: string){
    if (side == 'left') {
      this.container_categories.nativeElement.scrollLeft -= 150;
    } else {
      this.container_categories.nativeElement.scrollLeft += 150;
      }
  }
  
  // Swiper configuration for principal banneR
  public my_swipe: SwiperOptions = {
    slidesPerView: 'auto',
    // grid: {rows: 2},
    spaceBetween: 50,
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

  // Dummy data
  products = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 11, 12, 13, 14, 15, 16, 23, 4, 4,4 ,4,4,4 , 4,4 , 4,4 ,4 ,4 ,4 ];
}
