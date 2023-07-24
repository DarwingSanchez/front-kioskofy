import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { Order } from 'src/app/core/interfaces/order';

@Component({
  selector: 'app-orders-history',
  templateUrl: './orders-history.component.html',
  styleUrls: ['./orders-history.component.css']
})
export class OrdersHistoryComponent {
  @Input() orders!: any;
  @Input() order_selected!: number;
  @Output() emit_open_order = new EventEmitter();
  public faUser = faUser;

  constructor(private router: Router) {}

  goToOrder(order: Order) {
    this.router.navigate([], { queryParams: { order_id: order.order_id } }).then(() => {});
  }
}
