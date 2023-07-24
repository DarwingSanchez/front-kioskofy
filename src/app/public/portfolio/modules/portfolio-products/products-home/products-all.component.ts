import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { lastValueFrom } from 'rxjs';
import { Product } from 'src/app/core/interfaces/portfolio/product.interface';
import { User } from 'src/app/core/interfaces/user.interface';
import { LocalStorageService } from 'src/app/core/services/local-storage/local-storage.service';
import { ProductsService } from 'src/app/core/services/products/products.service';
import { UsersService } from 'src/app/core/services/users/users.service';
import { LoadingComponent } from 'src/app/modal/loading/loading.component';
import { SimpleAlertComponent } from 'src/app/modal/simple-alert/simple-alert.component';

@Component({
  selector: 'app-products-all',
  templateUrl: './products-all.component.html',
  styleUrls: ['./products-all.component.css']
})
export class ProductsAllComponent implements OnInit {
  // Paginator
  public page_limit: number = 36;
  public page_current: number = 1;
  public page_total: number = 1;
  public input_form: UntypedFormGroup = this.formBuilder.group({ search_text: [''] });
  // Banners
  public banners_imgs: string[] = [];
  public ng_modal_options: NgbModalOptions = { backdrop: 'static', keyboard: false, centered: true };
  // Filters
  public products: Product[] = []
  private filters_applied: any = {};
  // User
  public user_id!: string;
  public user!: User;
  // Utils
  public empty_state_msg: string = "Oops, your search didn't return any products, please try again.";

  constructor(
    private modalService: NgbModal,
    private router: Router,
    private formBuilder: UntypedFormBuilder,
    private _productsService: ProductsService,
    private _usersService: UsersService,
    private localStorageService: LocalStorageService
    ) {}

  async ngOnInit(): Promise<void> {
    try {
      this.getBanners();
      await this.getUserID();
      this.getDataUserLean();
      this.subscribeToForms();
    } catch (error) {
      this.alertUser('alert', '¡Oh oh!', 'Sorry, we are experiencing some problems, try again later');
    }
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

  private  getUserID() {
     this.localStorageService.getItem('user')
      .then((resp: any) => {
        if(resp._id) this.user_id = resp._id;
      }).catch((error) => {
        throw error;
      })
  }


 // Get the data for the user based on its ID
  public getDataUserLean() {
    lastValueFrom(this._usersService.getDataUserLean(this.user_id))
      .then((resp: any) => {
        if(resp.success && resp.data && resp.data !== null && resp.data.length) this.user = resp.data[0];
      })
      .catch((error: Error) => {
        throw error;
      });
  }

  // Subscribe to all forms to detect changes, if change are apply it will update the filters
  private subscribeToForms(): void {
    this.input_form.valueChanges.subscribe(value => { this.getProducts() });
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
    this.filters_applied = { ...event, status: 'accepted', stock: true, search_text: this.input_form.value.search_text };
    this.getProducts();
  }

  // Get products by filters applied
  private async getProducts(): Promise<void> {
    const modal_loading = this.openLoaderComponent('Please wait one moment', '');
    this.products = [];
    await lastValueFrom(this._productsService.getProducts(this.filters_applied))
      .then((resp: any) => {
        if(resp.success && resp.data && resp.data.data.length) {
          this.products = resp.data.data;
          if (resp.data.count.length && resp.data.count[0].count)
            this.page_total = Math.ceil(resp.data.count[0].count / this.page_limit);
        };
      }).catch((error: any) => {
        throw error;
      })
      modal_loading.close();
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

  // Open modal to alert the user
  private openLoaderComponent(title: string, msg: string) {
    const modalRef = this.modalService.open(LoadingComponent, this.ng_modal_options);
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.msg = msg;
    return modalRef;
  }
}
