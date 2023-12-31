import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
// import { TokenService } from '../token/token.service';
import { filter, Observable } from 'rxjs';
import { removeFalseAndFalsyKeys } from '../../helpers/functions/removeFalseAndFalsyKeys';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  // API URL
  private URL_API = `${environment.HOST}/api`
  // Auth validation
  // private token: any = this.tokenService.onGetItem('token');
  // private headers = new HttpHeaders({ Authorization: this.token });

  constructor(
    // private tokenService: TokenService,
    private http : HttpClient
  ) { }

  public getProducts(filters: any) {
    filters = removeFalseAndFalsyKeys(filters);
    let query_params = new HttpParams()
      .set('status', filters.status || 'accepted')
      .set('page', filters.page)
      .set('limit', filters.limit)
      .set('stock', filters.stock)
      .set('search_text', filters.search_text)
      .set('countries', filters.countries)
      .set('categories', filters.categories)
      .set('condition', filters.condition)
      .set('price', filters.price)
      .set('sort_by', filters.sort_by)
      .set('best_seller', filters.best_seller)
      .set('trending', filters.trending)
      .set('hand_crafted', filters.hand_crafted)
      .set('recommended', filters.recommended)
      .set('start_up', filters.start_up)
      .set('non_profit', filters.non_profit)
      .set('location', filters.location);
    return this.http.get(`${this.URL_API}/products`, { params: query_params })
  }

  public getProductBySlugOrID(slug_id: string) {
    return this.http.get(`${this.URL_API}/product/slug_id/${slug_id}`)
  }
  /**
   * Creates a comment
   * @param body | Body necessary to create comment, body taken from comment model in the back
   * @returns
   */
  createProduct(body:any) {
    return this.http.post(`${this.URL_API}/product`, body)
  }

  onSearchProductsBar(searchText: string):Observable<any> {
    return this.http.get(`${this.URL_API}/products/bar_search/${searchText}`)
  }
}
