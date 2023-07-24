import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private URL_API = `${environment.HOST}/api`;

  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService
  ) {}

  /** Observable and subscriber for user existence basic information */
  private user = new BehaviorSubject<any>(null);
  public user$ = this.user.asObservable();

  // Update user by Id
  public updateUserById(id: string, body: any) {
    return this.http.put(`${this.URL_API}/user/update/id/${id}`, body);
  }

  // Get user by Id
  public getUserById(id: string) {
    return this.http.get(`${this.URL_API}/user/${id}`);
  }  

  // Get user by id hides confidential data
  public getDataUserLean(id: string) {
    return this.http.get(`${this.URL_API}/user/confidential/${id}`);
  }  

  // Get user by id hides confidential data
  public getDataUserLean(id: string) {
    return this.http.get(`${this.URL_API}/user/confidential/${id}`);
  }  

  // Create user's profile
  public signUp(credentials: any) {
    return this.http.post(`${this.URL_API}/user`, credentials);
  }  

  // Logged in user's profile
  public login(credentials: any) {
    return this.http.post(`${this.URL_API}/user/login`, credentials);
  }  

  // Saves User's token into local storage
  public setUserAndTokenInLocalStorage(user: any, token: string | null): any {
    if (token) this.localStorageService.setItem('token', token);
    if (user) {
      this.localStorageService.setItem('user', user);
      this.user.next(user);
    }
  }

  /**
   * Global user information
   * @param user User information
   */
  onSetUser(user: any) {
    this.user.next(user);
  }
}
