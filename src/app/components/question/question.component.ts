import { Component, OnInit } from '@angular/core';
import {
  faStopwatch,
  faChevronLeft,
  faChevronRight,
  faSyncAlt,
} from '@fortawesome/free-solid-svg-icons';
import { QuestionService } from 'src/app/service/question.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
})
export class QuestionComponent implements OnInit {
  faStopwatch = faStopwatch;
  faChevronLeft = faChevronLeft;
  faChevronRight = faChevronRight;
  faSyncAlt = faSyncAlt;

  public name: string = '';
  public questionList: any = [];
  public currentQuestion: number = 0;
  public points: number = 0;
  counter: number = 60;

  constructor(private questionsService: QuestionService) {}

  ngOnInit(): void {
    this.name = localStorage.getItem('name')!;
    this.getAllQuestions();
  }

  getAllQuestions() {
    this.questionsService.getQuestionJSON().subscribe((res) => {
      this.questionList = res.questions;
    });
  }

  nextQuestion() {
    this.currentQuestion < 8 && this.currentQuestion++;
  }

  previousQuestion() {
    this.currentQuestion > 0 && this.currentQuestion--;
  }
}
