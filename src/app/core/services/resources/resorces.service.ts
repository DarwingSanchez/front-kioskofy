import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ResorcesService {
  // URL Api
  private URL_API = `${environment.HOST}/api`
  // Auth validation
  // private token: any = this.tokenService.onGetItem('token');
  private headers = new HttpHeaders({ 'Content-Type': 'multipart/form-data' });

  constructor(private http : HttpClient) {}

  /**
   * Get countries list for products or services to be offered
   * @returns | Will return a promise with an success in true or false depending on backend answer
   */
  public loadImgPortfolio(files: Blob[]) {
    const gallery = new FormData();
    for (const iterator of files) gallery.append('', iterator)
    console.log('gallery', gallery.getAll('')), this.headers;
    return this.http.post(`${this.URL_API}/aws_s3/portfolio`, gallery, { headers: this.headers });
  }  
}
