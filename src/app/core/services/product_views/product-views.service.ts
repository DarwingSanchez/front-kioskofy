import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductViewsService {
  private URL_API = `${environment.HOST}/api`

  constructor(private http : HttpClient) {}

  public addUserView(type: string, item: string, user: string, ) {
    const BODY = { type: type, item: item, add_user: user };
    return this.http.put(`${this.URL_API}/portfolio_view/add_view`, BODY);
  } 

}
