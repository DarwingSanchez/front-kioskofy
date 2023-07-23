import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { lastValueFrom } from 'rxjs';
import { Product } from 'src/app/core/interfaces/product.interface';
import { ProductsService } from 'src/app/core/services/products/products.service';
import { SimpleAlertComponent } from 'src/app/modal/simple-alert/simple-alert.component';

@Component({
  selector: 'app-products-all',
  templateUrl: './products-all.component.html',
  styleUrls: ['./products-all.component.css']
})
export class ProductsAllComponent implements OnInit {
  // Paginator
  public page_limit: number = 12;
  public page_current: number = 1;
  public page_total: number = 1;
  public input_form: UntypedFormGroup = this.formBuilder.group({ search_text: [''] });
  // Banners
  public banners_imgs: string[] = [];
  public ng_modal_options: NgbModalOptions = { backdrop: 'static', keyboard: false, centered: true };
  // Filters
  public products: Product[] = []
  private filters_applied = {};

  constructor(
    private modalService: NgbModal,
    private router: Router,
    private formBuilder: UntypedFormBuilder,
    private productsService: ProductsService
    ) {}

  ngOnInit(): void {
    try {
      this.getBanners();
      this.getPortfolio();
    } catch (error) {
      this.alertUser('alert', '¡Oh oh!', 'Sorry, we are experiencing some problems, try again later');
    }
  }

  private getPortfolio() {
    this.page_total = 10;
  }

  private getBanners() {
    // DUMMY DATA
    this.banners_imgs = [
      'https://swapp-recursos.s3.amazonaws.com/dzYMN9U7siZOXdS2.jpg',
      'https://swapp-recursos.s3.amazonaws.com/AgYXEmMl4Ub1mqc7.jpg',
      'https://swapp-recursos.s3.amazonaws.com/5ohCOINH8q2aMKM9.jpg',
      'https://swapp-recursos.s3.amazonaws.com/7NSv74SR6c5x92g10.jpg',
      'https://swapp-recursos.s3.amazonaws.com/XucubtFPJGRl3Yh1.jpg',
      'https://swapp-recursos.s3.amazonaws.com/ljGIm5LZUqC6kAE3.jpg',
    ]
  }

  /**
   * Get the pagination from child component "Paginator"
   * and updates this component varaible which is the input for the 
   * child component "Filters", on Filters is where the URL updates takes place
   * @param event Event with the page updated by the user on the component "Paginator"
   */
  public onGoToPage(event: any) {
    if (event.page <= this.page_total) this.page_current = event.page;
  }

  public getFiltersApplied(event: Event) {
    console.log(event);
    this.filters_applied = event;
    this.getProducts();
  }

  // Get products by filters applied
  private async getProducts(): Promise<void> {
    this.products = [];
    await lastValueFrom(this.productsService.getProducts(this.filters_applied))
      .then((resp: any) => {
        console.log(resp);
        if(resp.success && resp.data && resp.data.data.length) {
          this.products = resp.data.data;
        };
      }).catch((error: any) => {
        throw error;
      })
  }
  // Open modal to alert the user
  private alertUser(img_flag: string, title: string, msg: string): void {
    const modalRef = this.modalService.open(SimpleAlertComponent, this.ng_modal_options);
    modalRef.componentInstance.img_src = img_flag;
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.msg = msg;
    modalRef.componentInstance.btn_msg = 'Volver';
    modalRef.componentInstance.close_callback = () => {
      this.router.navigate(['/home']);
    };
  }
  // Store the portfolio to print on each card
  public portfolio = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 11, 12, 13, 14, 15, 16];
}
