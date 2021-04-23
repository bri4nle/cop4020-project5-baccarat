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

  constructor(public engine:EngineService) { }

  ngOnInit(): void {
  }

  async setupGame() {
    console.log("about to set up the game");
    await this.engine.setupGame();
    console.log("about to deal this game");
    this.hand = await this.engine.dealGame();
    console.log(this.hand);
    this.playerValue =this.engine.resultsEngine.calculateHandValue(this.hand.playerCards);
    console.log("Player Value: " + this.playerValue);
    this.bankerValue =this.engine.resultsEngine.calculateHandValue(this.hand.bankerCards);
    console.log("Banker Value: " + this.bankerValue);
  }

}
