import { Component, Input, OnChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { faImage } from '@fortawesome/free-solid-svg-icons';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { Order } from 'src/app/core/interfaces/order';
import { PortfolioDetailGallerySwiperComponent } from 'src/app/utils/portfolio-detail/components/portfolio-detail-gallery-swiper/portfolio-detail-gallery-swiper.component';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnChanges {
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
  public qty_form = new FormGroup({
    qty: new FormControl(null, [Validators.required, Validators.pattern(/^[0-9]*$/), Validators.min(0)]),
  });

  constructor(private modalService: NgbModal) {}

  ngOnChanges(): void {
    if (this.order) {
      this.qty_form.controls['qty'].addValidators([Validators.max(this.order.qty)]);
      this.qty_form.patchValue({ qty: this.order.item.stock });
    }
  }

  public showGallerySwiper() {
    const modalRef = this.modalService.open(PortfolioDetailGallerySwiperComponent, this.ng_modal_options);
    modalRef.componentInstance.portfolio = this.order.item.images;
    modalRef.componentInstance.image_selected = this.order.item.images[0];
  }
}
