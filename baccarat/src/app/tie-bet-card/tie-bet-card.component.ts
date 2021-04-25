import { Component, OnInit } from '@angular/core';
import { GameBoardComponent } from '../game-board/game-board.component';

@Component({
  selector: 'app-tie-bet-card',
  templateUrl: './tie-bet-card.component.html',
  styleUrls: ['./tie-bet-card.component.css']
})
export class TieBetCardComponent implements OnInit {

  isChosen = false;

  constructor() { }

  ngOnInit(): void {
  }

  setTieBet() {
    this.isChosen = true;
  }

  isPicked() {
    return this.isChosen;
  }

  // deal() {
  //   this.gameBoard.setupGame();
  // }

}
