import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-score-board',
  templateUrl: './score-board.component.html',
  styleUrls: ['./score-board.component.css']
})
export class ScoreBoardComponent implements OnInit {
@Input() playerWinCount;
@Input() bankerWinCount;
@Input() tieCount;

  constructor() { }

  ngOnInit(): void {
  }

}
