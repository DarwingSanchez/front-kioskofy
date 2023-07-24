import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  private URL_API = `${environment.HOST}/api`

  constructor(private http : HttpClient) {}

  public createOrder(body: any) {
    return this.http.post(`${this.URL_API}/order`, body);
  }  

  getOrdersByFilters(filters: any) {
    let query_params = new HttpParams()
      .set('limit', filters.limit)
      .set('page', filters.page)
      .set('seller', filters.seller)
      .set('buyer', filters.buyer)
      .set('item', filters.item)
      .set('item_type', filters.item_type)
      .set('status', filters.status)
      .set('sort', filters.sort)
      .set('sort_order', filters.sort_order)
      .set('order_id', filters.order_id);
    return this.http.get(`${this.URL_API}/orders`, { params: query_params });
  }
}
