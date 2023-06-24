import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { PortfolioDetailGallerySwiperComponent } from '../portfolio-detail-gallery-swiper/portfolio-detail-gallery-swiper.component';

@Component({
  selector: 'app-portfolio-detail-gallery',
  templateUrl: './portfolio-detail-gallery.component.html',
  styleUrls: ['./portfolio-detail-gallery.component.css']
})
export class PortfolioDetailGalleryComponent {
  public show_gallery_swiper: boolean = false;
  @Input() portfolio!: any;
  @Input() image_selected: string = '';
  @Input() is_video: boolean = false;
  @Output() openModalImages = new EventEmitter();
  private ng_modal_options: NgbModalOptions = {
    backdrop: 'static',
    centered: true,
    keyboard: false,
    size: 'lg',
  };

  constructor(private modalService: NgbModal) {}

  public showGallerySwiper() {
    const modalRef = this.modalService.open(PortfolioDetailGallerySwiperComponent, this.ng_modal_options);
    modalRef.componentInstance.portfolio = this.portfolio;
    modalRef.componentInstance.image_selected = this.image_selected;
    modalRef.result.then((image_selected) => { if (image_selected) this.image_selected = image_selected });
  }
}
