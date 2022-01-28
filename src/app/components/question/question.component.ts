import { Component, OnInit } from '@angular/core';
import {
  faStopwatch,
  faChevronLeft,
  faChevronRight,
  faSyncAlt,
} from '@fortawesome/free-solid-svg-icons';
import { interval } from 'rxjs';
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
  correctAnswer: number = 0;
  wrongAnswer: number = 0;
  interval$: any;
  progress: string = '0';

  constructor(private questionsService: QuestionService) {}

  ngOnInit(): void {
    this.name = localStorage.getItem('name')!;
    this.getAllQuestions();
    this.startCounter();
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

  answer(currentQue: number, option: any) {
    if (option.correct) {
      this.points += 10;
      this.correctAnswer++;
    } else {
      this.points -= 10;
      this.wrongAnswer++;
    }
    currentQue < this.questionList.length && this.currentQuestion++;
  }

  startCounter() {
    this.interval$ = interval(1000).subscribe((val) => {
      this.counter--;
      if (this.counter === 0) {
        this.currentQuestion++;
        this.counter = 60;
        this.points -= 10;
      }
    });
    setTimeout(() => {
      this.interval$.unsubscribe();
    }, 600000);
  }

  stopCounter() {
    this.interval$.unsubscribe();
    this.counter = 0;
  }

  resetCounter() {
    this.stopCounter();
    this.counter = 60;
    this.startCounter();
  }

  resetQuiz() {
    this.resetCounter();
    this.getAllQuestions();
    this.points = 0;
    this.currentQuestion = 0;
  }
}
