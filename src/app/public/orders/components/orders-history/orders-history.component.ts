import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { faUser } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-orders-history',
  templateUrl: './orders-history.component.html',
  styleUrls: ['./orders-history.component.css']
})
export class OrdersHistoryComponent {
  @Input() orders!: any;
  @Input() order_selected!: number;
  public faUser = faUser;

  constructor(private router: Router) {}

  goToOrder(order_id: number) {
    this.router.navigate(['orders'], { queryParams: { order_id: order_id } }).then(() => {
      window.location.reload();
    });
  }
}
