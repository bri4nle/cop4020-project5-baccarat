import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-player-bet-card',
  templateUrl: './player-bet-card.component.html',
  styleUrls: ['./player-bet-card.component.css']
})
export class PlayerBetCardComponent implements OnInit {

  isChosen = false;

  constructor() { }

  ngOnInit(): void {
  }

  setPlayerBet() {
    this.isChosen = true;
  }

  isPicked() {
    return this.isChosen;
  }
}
