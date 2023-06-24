import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  private URL_API = `${environment.HOST}/api`

  constructor(private http : HttpClient) {}

  public getCategoriesByStatus(status: string) {
    return this.http.get(`${this.URL_API}/categories_all/${status}`);
  }  

  getCategoriesByFilters(filters: any) {
    let query_params = new HttpParams()
      .set('title', filters.title)
      .set('type', filters.type)
      .set('status', filters.status)
      .set('limit', filters.limit)
      .set('page', filters.page)
      .set('sort', filters.sort)
      .set('sort_order', filters.sort_order);
    return this.http.get(`${this.URL_API}/categories`, { params: query_params });
  }
}
