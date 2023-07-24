import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  private URL_API = `${environment.HOST}/api`

  constructor(private http : HttpClient) {}

  public addUserFavorite(user: string, item: string) {
    let BODY = { user: user, item: item };
    return this.http.put(`${this.URL_API}/favorites/user/${user}`, BODY);
  }
}