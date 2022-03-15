import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { QuestionsInterface } from 'src/app/types/questions.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  constructor(private http: HttpClient) {}

  getQuestionJSON(): Observable<QuestionsInterface> {
    return this.http.get<QuestionsInterface>('assets/questions.json');
  }
}
