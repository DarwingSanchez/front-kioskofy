import { Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, Renderer2, ViewChild } from '@angular/core';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SwiperOptions } from 'swiper';

@Component({
  selector: 'app-portfolio-detail-gallery-swiper',
  templateUrl: './portfolio-detail-gallery-swiper.component.html',
  styleUrls: ['./portfolio-detail-gallery-swiper.component.css']
})
export class PortfolioDetailGallerySwiperComponent  {
  public icon_close = faClose;
  // Parent-Child communication
  @Input() portfolio!: any;
  @Input() image_selected: any = 0;

  constructor(private activeModal: NgbActiveModal) {}

  closeModal() {
    this.activeModal.close(this.image_selected);
  }
}
