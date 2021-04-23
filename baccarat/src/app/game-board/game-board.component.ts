import { Component, OnInit } from '@angular/core';
import { EngineService } from '../engine.service';
import { Hand } from '../hand.service';

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.css']
})
export class GameBoardComponent implements OnInit {
  hand: Hand
  playerValue: number;
  bankerValue: number;
  playerWinCount = 0;
  bankerWinCount = 0;
  tieCount = 0;
  init = true;

  constructor(public engine:EngineService) { }

  ngOnInit(): void {
  }

  async setupGame() {
    console.log("about to set up the game");
    if (this.init) {
      await this.engine.setupGame();
      this.init = false;
    }
    console.log("about to deal this game");
    this.hand = await this.engine.dealGame();
    console.log(this.hand);
    this.playerValue =this.engine.resultsEngine.calculateHandValue(this.hand.playerCards);
    console.log("Player Value: " + this.playerValue);
    this.bankerValue =this.engine.resultsEngine.calculateHandValue(this.hand.bankerCards);
    console.log("Banker Value: " + this.bankerValue);

    if(this.playerValue > this.bankerValue)
      ++this.playerWinCount;
    else if (this.playerValue < this.bankerValue)
      ++this.bankerWinCount;
    else
      ++this.tieCount;

    console.log("Player win count:" + this.playerWinCount);
    console.log("Banker win count: " + this.bankerWinCount);
  }

}
