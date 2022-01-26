import { Component, OnInit } from '@angular/core';
import {
  faStopwatch,
  faChevronLeft,
  faChevronRight,
  faSyncAlt,
} from '@fortawesome/free-solid-svg-icons';

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

  constructor() {}

  ngOnInit(): void {}
}
