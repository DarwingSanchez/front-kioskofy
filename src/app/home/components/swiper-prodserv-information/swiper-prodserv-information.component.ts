import { Component, ElementRef, HostListener, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-swiper-prodserv-information',
  templateUrl: './swiper-prodserv-information.component.html',
  styleUrls: ['./swiper-prodserv-information.component.css']
})
export class SwiperProdservInformationComponent implements OnInit {
  // Inputs from parent
  @Input() portfolio_type: string = "";
  // Native element for contianer of carousel
  @ViewChild('container_portfolio', { static: true })
  public container_portfolio!: ElementRef;
  // Automatic scroll
  public banner_interval: any;
  public container_last_position: number = -1;
  public flag_dir_auto_carousel: 'right' | 'left' = 'right';
  public swipe_time = 5000;
  public swipte_length = 500;
  // Data to show on the DOM
  public data = {title: '', description: '', button_text: ''};
  // Store the portfolio to print on each card
  public portfolio = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 11, 12, 13, 14, 15, 16, 23, 4, 4,4 ,4,4,4 , 4,4 , 4,4 ,4 ,4 ,4 ];

  constructor() {}
  
  ngOnInit(): void {
    this.getEnviromentVariables();
    this.banner_interval = setInterval(() => this.automaticScrollCarousel(), this.swipe_time);
  }

  /**
   * Depending on the type of portfolio shows the data on the DOM
   */
  getEnviromentVariables() {
    switch (this.portfolio_type) {
      case 'products':
        this.data = {
          title: 'Products',
          description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias porro culpa eligendi
                    similique. Distinctio, velit sed beatae sapiente pariatur aut minus rem, libero nihil repellat
                    delectus officiis deleniti saepe eaque.`,
          button_text: 'See all products'
        }
        break;
      case 'services':
        this.data = {
          title: 'Services',
          description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias porro culpa eligendi
                    similique. Distinctio, velit sed beatae sapiente pariatur aut minus rem, libero nihil repellat
                    delectus officiis deleniti saepe eaque.`,
          button_text: 'See all services'
        }
        break;
      default:
        break;
    }
  }

  /**
   * Automatically moves the cards carousel
   */
  automaticScrollCarousel(){
    this.validateEndsContainerCarouser();
    this.scrollContainer(this.flag_dir_auto_carousel, this.container_portfolio.nativeElement, this.swipte_length)
  }
  
  /**
   * Validates if a native elementin this case a crousel
   * gets to the end of the container, if so, it will change
   * the flag for the direction of the auto swipe
   */
  validateEndsContainerCarouser() {
    if(this.container_last_position - (this.container_portfolio.nativeElement.scrollLeft + this.swipte_length) == 0) {
      this.flag_dir_auto_carousel = 'left';
    } else if (this.container_last_position <= 0) {
      this.flag_dir_auto_carousel = 'right';
    }
  }

  /**
   * Scroll a HTML element to a require side
   * @param side side to scroll the div
   * @param nativeElement the HTML element to scroll
   */
  scrollContainer(side: string, nativeElement: any, length: number, triggeres_by: string = 'automatic'){
    if(triggeres_by == 'button') clearInterval(this.banner_interval); // If the method is called from the DOM stops the auto swipe
    if (side == 'left') {
      nativeElement.scrollTo({ left: (nativeElement.scrollLeft - length), behavior: 'smooth' });
      this.container_last_position = nativeElement.scrollLeft - length;
    } else {
      nativeElement.scrollTo({ left: (nativeElement.scrollLeft + length), behavior: 'smooth' });
      this.container_last_position = nativeElement.scrollLeft + length;
    }
  }
}
