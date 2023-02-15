import { animate, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-banner',
  templateUrl: './user-banner.component.html',
  styleUrls: ['./user-banner.component.css'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: '0' }),
        animate('.9s ease-out', style({ opacity: '1' })),
      ]),
    ]),
  ],
})
export class UserBannerComponent implements OnInit {
  public current_slide: number = 0;
  @Input() images = [
    'https://d2u6ap06x2kfex.cloudfront.net/wp-content/uploads/2022/09/Fiesta-Evansville-provided.jpg',
    'https://images.303magazine.com/uploads/2020/05/80579768_2860193164001922_345958855483588608_o-1.jpg',
    'https://www.facts-about-mexico.com/wp-content/uploads/2022/01/shutterstock-ooo-photography.jpg',
    'https://assets-cdn.audionetwork.com/templates/images/Image_10468_98_20482616.png',
    'https://www.billboard.com/wp-content/uploads/2021/09/YouTube-Analysis-dd-latin-2021-billboard-1548-1632323519.jpg?w=942&h=623&crop=1',
    'https://fhis.ubc.ca/wp-content/uploads/sites/29/2021/09/Image-Alessandra-Santos-Indigenous.png',
    'https://media.npr.org/assets/img/2021/09/16/gettyimages-1290118946_wide-c63077eb56a633d578404ed6fb5d4ce0c6216cfa.jpg',
  ]
  
  public ngOnInit(): void {
    this.startAutoSlider();
  }

  // Start automatic interval to move slider
  public startAutoSlider(): void {
    setInterval(
      () => { this.nextSlide() }, 4000);
  }

  // Select and shows the previous slide/banner
  public prevSlide(): any {
    const previous = this.current_slide - 1;
    this.current_slide = previous < 0 ? this.images.length - 1 : previous;
  }
  
  // Select and shows the next slide/banner
  public nextSlide(): any {
    const next = this.current_slide + 1;
    this.current_slide = next === this.images.length ? 0 : next;
  }
}
