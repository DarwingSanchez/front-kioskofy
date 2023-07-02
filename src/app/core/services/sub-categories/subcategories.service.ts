import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SubCategoriesService {
  private URL_API = `${environment.HOST}/api`

  constructor(private http : HttpClient) {}

  public getSubCatsByStatusAndCategory(status: string, category: string) {
    return this.http.get(`${this.URL_API}/sub_categories/${status}/category/${category}`);
  }  
}
