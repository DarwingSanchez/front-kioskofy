import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
// import { TokenService } from '../token/token.service';
import { filter, Observable } from 'rxjs';

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

  getProducts() {
    return this.http.get(`${this.URL_API}/products/get/all`)
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
    return this.http.post(`${this.URL_API}/products/create`, body)
  }

  onSearchProductsBar(searchText: string):Observable<any> {
    return this.http.get(`${this.URL_API}/products/bar_search/${searchText}`)
  }
}
