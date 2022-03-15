import { Component, OnInit } from '@angular/core';
import {
  faStopwatch,
  faChevronLeft,
  faChevronRight,
  faSyncAlt,
} from '@fortawesome/free-solid-svg-icons';
import { interval, Subscription } from 'rxjs';
import { QuestionService } from 'src/app/service/question.service';
import { OptionInterface } from 'src/app/types/option.interface';
import { QuestionInterface } from 'src/app/types/question.interface';

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

  name: string = '';
  questionList: QuestionInterface[] = [];
  currentQuestion: number = 0;
  points: number = 0;
  counter: number = 60;
  correctAnswer: number = 0;
  wrongAnswer: number = 0;
  interval$!: Subscription;
  progress: string = '0';
  isQuizCompleted: boolean = false;
  isCounterHasBeenReset: boolean = true;

  constructor(private questionsService: QuestionService) {}

  ngOnInit(): void {
    this.name = localStorage.getItem('name')!;
    this.getAllQuestions();
    this.startCounter();
  }

  getAllQuestions(): void {
    this.questionsService.getQuestionJSON().subscribe((res) => {
      this.questionList = res.questions;
    });
  }

  nextQuestion(): void {
    this.currentQuestion < 8 && this.currentQuestion++;
  }

  previousQuestion(): void {
    this.currentQuestion > 0 && this.currentQuestion--;
  }

  answer(currentQue: number, option: OptionInterface): void {
    if (!this.isCounterHasBeenReset) return;
    if (option.correct) {
      this.points += 10;
      this.correctAnswer++;
    } else {
      this.points -= 10;
      this.wrongAnswer++;
    }

    this.isCounterHasBeenReset = false;

    setTimeout(() => {
      currentQue < this.questionList.length && this.currentQuestion++;
      currentQue === this.questionList.length && (this.isQuizCompleted = true);
      this.getProgressPercent();
      this.resetCounter();
    }, 1000);
  }

  startCounter(): void {
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

  stopCounter(): void {
    this.interval$.unsubscribe();
    this.counter = 0;
  }

  resetCounter(): void {
    this.stopCounter();
    this.counter = 60;
    this.isCounterHasBeenReset = true;
    this.startCounter();
  }

  resetQuiz(): void {
    this.resetCounter();
    this.getAllQuestions();
    this.points = 0;
    this.currentQuestion = 0;
    this.isQuizCompleted = false;
  }

  getProgressPercent(): void {
    this.progress =
      (this.currentQuestion / (this.questionList.length - 1)) * 100 + '';
  }
}
