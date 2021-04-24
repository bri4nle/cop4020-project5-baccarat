import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { NumericLiteral } from 'typescript';
import { CardDeckAPIService } from '../card-deck-api.service';
import { EngineService } from '../engine.service';
import { Hand } from '../hand.service';
import { ProbabilityService } from '../probability.service';

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.css']
})
export class GameBoardComponent implements OnInit {
  hand: Hand
  init = true;
  playerValue: number;
  bankerValue: number;
  playerWinCount = 0;
  bankerWinCount = 0;
  tieCount = 0;
  playerProb: number;
  bankerProb: number;
  tieProb: number;
  playerWinPercentage = 0.0;
  bankerWinPercentage = 0.0;
  tiePercentage = 0.0;
  gamesPlayed = 0;

  constructor(public engine: EngineService) { }

  ngOnInit(): void {
  }

  async setupGame() {
    console.log("about to set up the game");
    if (this.init) {
      await this.engine.initDeck();
      this.init = false;
    }

    console.log("about to deal this game");
    this.hand = await this.engine.dealGame();
    ++this.gamesPlayed;
    [this.playerProb, this.bankerProb, this.tieProb] = this.engine.getProbs();

    // console.log(this.hand);
    this.playerValue =this.engine.resultsEngine.calculateHandValue(this.hand.playerCards);
    console.log("Player Value: " + this.playerValue);
    this.bankerValue =this.engine.resultsEngine.calculateHandValue(this.hand.bankerCards);
    console.log("Banker Value: " + this.bankerValue);

    // Calculate win counts
    if(this.playerValue > this.bankerValue)
      ++this.playerWinCount;
    else if (this.playerValue < this.bankerValue)
      ++this.bankerWinCount;
    else
      ++this.tieCount;

    // Calculate win percentage
    this.bankerWinPercentage = this.engine.round(this.bankerWinCount / this.gamesPlayed * 100);
    this.playerWinPercentage = this.engine.round(this.playerWinCount / this.gamesPlayed * 100);
    this.tiePercentage = this.engine.round(this.tieCount / this.gamesPlayed * 100);

    console.log("Player win count:" + this.playerWinCount);
    console.log("Banker win count: " + this.bankerWinCount);
  }

}
