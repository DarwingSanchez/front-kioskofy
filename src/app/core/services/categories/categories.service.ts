import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  // URL Api
  private URL_API = `${environment.HOST}/api`
  // Auth validation
  // private token: any = this.tokenService.onGetItem('token');
  // private headers = new HttpHeaders({ Authorization: this.token });

  constructor(
    // private tokenService: TokenService,
    private http : HttpClient,
  ) {/** */}

  /**
   * Get countries list for products or services to be offered
   * @returns | Will return a promise with an success in true or false depending on backend answer
   */

  /**
   * 
   */
  getCategoriesByStatus(status: string) {
    return this.http.get(`${this.URL_API}/categories_all/${status}`);
  }  
}
