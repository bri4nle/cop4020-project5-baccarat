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

  // async drawACard() {
  //   console.log("called function");
  //   let response = await this.cardDeckAPI.getDecks();
  //   console.log(response);
  //   console.log("end drawACard");
  // }
}
