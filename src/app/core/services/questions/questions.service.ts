import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class QuestionsService {
  private URL_API = `${environment.HOST}/api`

  constructor(private http : HttpClient) {}

  public getQuestionByItem(item: string) {
    return this.http.get(`${this.URL_API}/question/item/${item}`);
  }

  public addQuestion(body: object) {
    return this.http.post(`${this.URL_API}/question`, body);
  }
}
