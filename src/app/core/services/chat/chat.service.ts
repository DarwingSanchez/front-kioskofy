import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private URL_API = `${environment.HOST}/api`

  constructor(private http : HttpClient) {}

  public getConversation(query: string, value: any) {
    return this.http.get(`${this.URL_API}/conversation/${query}/${value}`);
  }

}
