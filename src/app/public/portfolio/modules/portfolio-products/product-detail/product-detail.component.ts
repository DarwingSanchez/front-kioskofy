import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { lastValueFrom } from 'rxjs';
import { ProductsService } from 'src/app/core/services/products/products.service';
import { SimpleAlertComponent } from 'src/app/modal/simple-alert/simple-alert.component';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  public product!: any;
  public image_selected!: string;
  public images_seleceted_is_video: boolean = false;
  private product_url_slud_id!: string;
  public ng_modal_options: NgbModalOptions = { backdrop: 'static', keyboard: false, centered: true };

  constructor(
    private productsService: ProductsService,
    private activateRoute: ActivatedRoute,
    private modalService: NgbModal
  ) {}

  async ngOnInit() {
    try {
      this.product_url_slud_id = this.getQueryParamsFromURL();
      await this.getProductBySlugOrID(this.product_url_slud_id);
    } catch (error) {
      this.alertUser('warning', '¡Oh oh!', 'Sorry, we are experiencing some problems.');
    }
  }

  private getQueryParamsFromURL(): string {
    const SLUG_ID = this.activateRoute.snapshot.params['slug_id'];
    if (!SLUG_ID || SLUG_ID === '') throw Error;
    else return SLUG_ID;
  }

  // Get all available countries
  private async getProductBySlugOrID(slug_id: string) {
    await lastValueFrom(this.productsService.getProductBySlugOrID(slug_id))
      .then((resp: any) => {
        console.log('***', resp);
        if(resp.success && resp.data) {
          this.product = resp.data
          if(this.product.images && this.product.images[0]) this.image_selected = this.product.images[0];
        }
        else throw new Error;
      })
      .catch((error: Error) => {
        console.log(error);
        
        throw error;
      });
  }

  // Change the image selected for the gallery (input comse from component "thumbnail")
  public changeImage(event: any) {
    this.images_seleceted_is_video = event.type === 'video' ? true : false
    this.image_selected = event.url;
  }

  // Open modal to alert the user
  private alertUser(img_flag: string, title: string, msg: string): void {
    const modalRef = this.modalService.open(SimpleAlertComponent, this.ng_modal_options);
    modalRef.componentInstance.img_src = img_flag;
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.msg = msg;
    modalRef.componentInstance.btn_msg = 'Volver';
    modalRef.componentInstance.close_callback = () => {};
  }
}
