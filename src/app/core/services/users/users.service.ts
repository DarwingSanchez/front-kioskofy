import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LocalStorageService } from '../local-storage/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private URL_API = `${environment.HOST}/api`

  constructor(private http: HttpClient, private localStorageService: LocalStorageService) {}

  // Update user by Id
  public updateUserById(id: string, body: any) {
    return this.http.put(`${this.URL_API}/user/update/id/${id}`, body);
  }  

  // Get user by Id
  public getUserById(id: string) {
    return this.http.get(`${this.URL_API}/user_id/${id}`);
  }  

  // Create user's profile
  public signUp(credentials: any) {
    return this.http.post(`${this.URL_API}/user_create`, credentials);
  }  

  // Logged in user's profile
  public login(credentials: any) {
    return this.http.post(`${this.URL_API}/user_login`, credentials);
  }  

  // Saves User's token into local storage
  public setUserAndTokenInLocalStorage(user: any, token: string | null): any {
    if(token) this.localStorageService.setItem('token', token)
    if(user) this.localStorageService.setItem('user', user)
  }
}
