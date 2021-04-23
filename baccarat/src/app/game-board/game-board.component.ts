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

  constructor(public engine:EngineService) { }

  ngOnInit(): void {
  }

  async setupGame() {
    console.log("about to set up the game");
    await this.engine.setupGame();
    console.log("about to deal this game");
    this.hand = await this.engine.dealGame();
    console.log(this.hand);
  }

}
