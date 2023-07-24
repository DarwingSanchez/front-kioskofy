import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faCommentDots, faStar, faUser } from '@fortawesome/free-solid-svg-icons';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { lastValueFrom } from 'rxjs';
import { FONT_AWESOME_ICONS } from 'src/app/core/constants/icons';
import { limitNumberWithinRange } from 'src/app/core/helpers/functions/limitNumberWithinRange';
import { Order } from 'src/app/core/interfaces/order';
import { LocalStorageService } from 'src/app/core/services/local-storage/local-storage.service';
import { OrdersService } from 'src/app/core/services/orders/orders.service';
import { ProductViewsService } from 'src/app/core/services/product_views/product-views.service';
import { LoadingComponent } from 'src/app/modal/loading/loading.component';
import { SimpleAlertComponent } from 'src/app/modal/simple-alert/simple-alert.component';

@Component({
  selector: 'app-portfolio-detail',
  templateUrl: './portfolio-detail.component.html',
  styleUrls: ['./portfolio-detail.component.css']
})
export class PortfolioDetailComponent implements OnChanges, OnInit {
  @Input() portfolio!: any;
  public readonly FONT_AWESOME_ICONS = FONT_AWESOME_ICONS;
  public user_id!: string;
  private is_order_exists: any;
  public image_selected!: string;
  public images_seleceted_is_video: boolean = false;
  public icon_message = faCommentDots;
  public ng_modal_options: NgbModalOptions = { backdrop: 'static', keyboard: false, centered: true };
  public qty_form = new FormGroup({
    qty: new FormControl(null, [Validators.required, Validators.pattern(/^[0-9]*$/), Validators.min(0)]),
  });

  constructor(
    private modalService: NgbModal,
    private localStorageService: LocalStorageService,
    private ordersService: OrdersService,
    private productViewsService: ProductViewsService,
    private router: Router,
  ) {}

  ngOnChanges(): void {
    if (this.portfolio && !this.image_selected) {
      this.image_selected = this.portfolio.images[0];
      this.qty_form.controls['qty'].addValidators([Validators.max(this.portfolio.stock)]);
      this.addUserItemView();
    };
  }

  async ngOnInit() {
    await this.getUserID();
  }

  private  getUserID() {
     this.localStorageService.getItem('user')
      .then((resp: any) => {
        if(resp._id) this.user_id = resp._id;
      }).catch((error) => {
        throw error;
      })
  }

  // Adds the view for this product by the logged user
  private  addUserItemView() {
    lastValueFrom(this.productViewsService.addUserView('product', this.portfolio._id,this.user_id));
  }

  // Validate if the item has already an order for the buyer and return this order
  private async validateIfOrderExists(filters: any) {
    delete filters.item_type;
    const resp = await lastValueFrom(this.ordersService.getOrdersByFilters(filters))
      .then((resp: any) => {
        if(resp.success && resp.data  && resp.data.data.length) {
          this.is_order_exists = true;
          return resp.data.data[0];
        };
      })
    return resp;
  }

  // Change the image selected for the gallery (input comse from component "thumbnail")
  public changeImage(event: any) {
    this.images_seleceted_is_video = event.type === 'video' ? true : false
    this.image_selected = event.url;
  }

  // Create a new order for the item
  public async createOrder() {
    const modal_loading = this.openLoaderComponent('Please wait one moment', '');
    try {
      if (!this.user_id) throw new Error('No buyer id found');
      const ORDER: Order = this.createOrderObject();
      const ORDER_EXISTS = await this.validateIfOrderExists(ORDER);
      if (this.is_order_exists) {
        modal_loading.close();
        this.router.navigate(['orders/buy'], { queryParams: {order_id: ORDER_EXISTS.order_id} });
      } else {
        await lastValueFrom(this.ordersService.createOrder(ORDER))
          .then((resp: any) => {
            modal_loading.close();
            if(resp.success && resp.data) 
              this.alertUser('success', '¡Great!', 'Your order has been created', 'navigate-order', resp.data.order_id);
            else throw new Error('Error while creating the order');
          })
      }
      } catch (error) {
        this.alertUser('warning', '¡Oh oh!', 'There was a problem, please try again later');
        modal_loading.close();
        throw error;
      }
  }

  // Create the object for the order to be created
  createOrderObject() {
    const ORDER: Order = {
      buyer: this.user_id,
      seller:  this.portfolio.seller._id,
      item_type: this.router.url.split('/')[1] ===  'product' ? 'product' : 'service',
      item: this.portfolio._id,
      price: this.portfolio.price,
      price_discount: this.portfolio.price_discount,
      qty: this.qty_form.value.qty!,
      status: 'pending'
    }
    return ORDER;
  }


  // Item quantity can not be negative or greater than the available stock
  public limitProductQtyToStock(event: any ): void {
    const VALUE: any = Number((event.target as HTMLTextAreaElement).value);
    if(VALUE) {
      const RESULT = limitNumberWithinRange(VALUE, 0, this.portfolio.stock);
      this.qty_form.patchValue({ qty: RESULT });
    }
  }

  // Open modal to alert the user
  private openLoaderComponent(title: string, msg: string) {
    const modalRef = this.modalService.open(LoadingComponent, this.ng_modal_options);
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.msg = msg;
    return modalRef;
  }

  // Open modal to alert the user
  private alertUser(img_flag: string, title: string, msg: string, action: string = 'NA', action_value: string = 'NA'): void {
    const modalRef = this.modalService.open(SimpleAlertComponent, this.ng_modal_options);
    modalRef.componentInstance.img_src = img_flag;
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.msg = msg;
    modalRef.componentInstance.btn_msg = 'Volver';
    modalRef.componentInstance.close_callback = () => {
      if (action === 'navigate-order') this.router.navigate(['orders'], { queryParams: { order_id: action_value } });
    };
  }
}
