import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {
  private URL_API = `${environment.HOST}/api`

  constructor(private http : HttpClient) {}

  getCountries() {
    return this.http.get(`${this.URL_API}/country/all/active`);
  }  

  getCountriesByFilters(filters: any) {
    let query_params = new HttpParams()
      .set('name', filters.name)
      .set('code', filters.code)
      .set('isoCode', filters.isoCode)
      .set('flag', filters.flag)
      .set('status', filters.status)
      .set('limit', filters.limit)
      .set('page', filters.page)
      .set('sort', filters.sort)
      .set('sort_order', filters.sort_order);
    return this.http.get(`${this.URL_API}/countries`, { params: query_params });
  }
}
