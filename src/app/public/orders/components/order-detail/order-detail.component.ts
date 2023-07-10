import { Component, Input } from '@angular/core';
import { faImage } from '@fortawesome/free-solid-svg-icons';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { Order } from 'src/app/core/interfaces/order';
import { PortfolioDetailGallerySwiperComponent } from 'src/app/utils/portfolio-detail/components/portfolio-detail-gallery-swiper/portfolio-detail-gallery-swiper.component';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent {
  @Input() user_id!: any;
  @Input() order!: Order | any;
  @Input() chat!: any;
  public icon_img = faImage;
  private ng_modal_options: NgbModalOptions = {
    backdrop: 'static',
    centered: true,
    keyboard: false,
    size: 'lg',
  };

  constructor(private modalService: NgbModal) {}

  public showGallerySwiper() {
    const modalRef = this.modalService.open(PortfolioDetailGallerySwiperComponent, this.ng_modal_options);
    modalRef.componentInstance.portfolio = this.order.item_id.images;
    modalRef.componentInstance.image_selected = this.order.item_id.images[0];
  }
}
