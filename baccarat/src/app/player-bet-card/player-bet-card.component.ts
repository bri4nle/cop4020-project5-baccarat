import { Component, OnInit } from '@angular/core';
import { CardDeckAPIService } from '../card-deck-api.service';

@Component({
  selector: 'app-player-bet-card',
  templateUrl: './player-bet-card.component.html',
  styleUrls: ['./player-bet-card.component.css']
})
export class PlayerBetCardComponent implements OnInit {

  constructor(public cardDeckAPI: CardDeckAPIService) { }

  ngOnInit(): void {
  }

  drawACard() {
    let response = this.cardDeckAPI.drawOneCardFromNewDeck();
    console.log(response);
  }
}
