import { Component, Input } from '@angular/core';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-portfolio-detail-gallery-swiper',
  templateUrl: './portfolio-detail-gallery-swiper.component.html',
  styleUrls: ['./portfolio-detail-gallery-swiper.component.css']
})
export class PortfolioDetailGallerySwiperComponent  {
  public icon_close = faClose;
  @Input() portfolio!: any;
  @Input() image_selected: string = '';

  constructor(private activeModal: NgbActiveModal) {}

  changeImage(img: string) {
    this.image_selected = img;
  }

  closeModal() {
    this.activeModal.close(this.image_selected);
  }
}
