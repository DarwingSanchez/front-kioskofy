import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { lastValueFrom } from 'rxjs';
import { Order } from 'src/app/core/interfaces/order';
import { ChatService } from 'src/app/core/services/chat/chat.service';
import { LocalStorageService } from 'src/app/core/services/local-storage/local-storage.service';
import { OrdersService } from 'src/app/core/services/orders/orders.service';
import { LoadingComponent } from 'src/app/modal/loading/loading.component';
import { SimpleAlertComponent } from 'src/app/modal/simple-alert/simple-alert.component';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  public orders_type!: string;
  public orders!: [Order];
  public order_id!: any;
  public order_selected!: Order | any;
  public user_id!: any;
  public chat: any;
  public ng_modal_options: NgbModalOptions = { backdrop: 'static', keyboard: false, centered: true };
  public empty_state_msg = '¡Sorry, nothing to see here, but you can create your first order in our marketplace!'

  constructor(
    private localStorageService: LocalStorageService,
    private ordersService: OrdersService,
    private chatService: ChatService,
    private activateRoute: ActivatedRoute,
    private modalService: NgbModal,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  async ngOnInit() {
    const modal_loading = this.openLoaderComponent('Please wait one moment', '');
    try {
      await this.getOrderType();
      await this.getUserID();
      await this.getOrders();
      await this.getOrderID();
      await this.getChat();
      // Close modal
      modal_loading.close();
    } catch (error) {
      console.log(error);
      
      modal_loading.close();
      this.alertUser('warning', '¡Oh oh!', 'There was a problem, please try again later', 'navigate-home');
    }
  }

  private async getOrderType() {
    this.route.queryParams
      .subscribe((params: any) => { this.orders_type = params['type'] });
    // If no order type is found on the url, it will change it
    if (!this.orders_type) this.changeOrdersType('buy');
  }

  private  async getUserID() {
    await this.localStorageService.getItem('user')
      .then((resp: any) => {
        console.log(resp);
        
        if(resp._id) this.user_id = resp._id;
        else throw new Error('User not found')
      }).catch((error) => {
        throw error;
      })
  }

  // Switch module orders between my sales and my buys
  changeOrdersType(type: string){
    this.orders_type = type;
    this.getOrders();
  }

  private async getOrders() {
    if (this.orders_type === 'buy')
      this.orders = await this.getOrdersByFilter({ buyer: this.user_id, order_id: this.order_id });
    else if (this.orders_type === 'sell')
      this.orders = await this.getOrdersByFilter({ seller: this.user_id, order_id: this.order_id });
  }

  // If order is selected, get the ID and then the whole data
  private async getOrderID() {
      this.order_id = Number(this.getQueryParamsFromURL('order_id'));
      // If no order ID is found on the url gets the first order ID
      if(!this.order_id) this.order_id = this.orders[0].order_id;
      this.order_selected = await this.getOrdersByFilter({ order_id: this.order_id });
      this.order_selected = this.order_selected[0];
  }

  // If order is selected, get the chat for the order
  private async getChat() {
    await lastValueFrom(this.chatService.getConversation('room', this.order_selected._id))
      .then((resp: any) => {
        console.log(resp);
        if(resp.success && resp.data) {
          this.chat = resp.data;
        };
      })
      .catch((error) => { throw error });
  }

  private async getOrdersByFilter(filter: any) {
    const resp = await lastValueFrom(this.ordersService.getOrdersByFilters(filter))
      .then((resp: any) => {
        console.log(resp);
        if(resp.success && resp.data && resp.data.data.length) {
          return resp.data.data;
        };
      })
    return resp;
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
      if (action === 'navigate-home') this.router.navigate(['home']);
    };
  }

  private getQueryParamsFromURL(query: string): string {
    return this.activateRoute.snapshot.queryParams[query];    
  }
}
