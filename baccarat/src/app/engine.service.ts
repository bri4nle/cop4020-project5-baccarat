import { Injectable } from '@angular/core';
import { CardDeckAPIService } from './card-deck-api.service';
import { Hand } from './hand.service';
import { ResultsEngine } from './results-engine.service';

@Injectable({
  providedIn: 'root'
})
export class EngineService {

  constructor(public cardDeck: CardDeckAPIService, 
              public hand: Hand,
              public resultsEngine: ResultsEngine) { }

  async setupGame() {
    let response = await this.cardDeck.getDecks();
    console.log("returned from API, currently about to leave setupGame(). Here's what I got");
    console.log(response);
  }

  dealGame() {
    this.hand.clearHand();
    let pCard1 = this.cardDeck.dealACard();
    let pCard2 = this.cardDeck.dealACard();
    let bCard1 = this.cardDeck.dealACard();
    let bCard2 = this.cardDeck.dealACard();

    this.hand.playerCards.push(pCard1, pCard2);
    this.hand.bankerCards.push(bCard1, bCard2);
    
    let bankerCardsValue = this.resultsEngine.calculateHandValue(this.hand.bankerCards);
    let playerCardsValue = this.resultsEngine.calculateHandValue(this.hand.playerCards);

    let bankerDraw = false;

    // Natural (Dealer or Player drew an 8 or 9) - neither side draws, game over.
    if (bankerCardsValue > 7 || playerCardsValue > 7) {
      return this.hand;
    }
    // Player has 6 or 7 - stands
    else if (playerCardsValue > 5) {
      // Player stood so dealer draws with [0-5] and stands with 6 or 7
      if (bankerCardsValue <= 5) {
          bankerDraw = true;
      }
    }
    // Player has 0 - 5, draws 3rd card
    else  {
      let player3rdCard = this.cardDeck.dealACard();
      this.hand.playerCards.push(player3rdCard);
      let player3rdCardValue =  ResultsEngine.valueForCard(player3rdCard);

      switch (player3rdCardValue) {
          case 2:
          case 3:
          // Player has 2, 3 - banker draws 0-4, stands 5-7
          if (bankerCardsValue < 5) bankerDraw = true;
          break;
          case 4:
          case 5:
          // Player has 4, 5 - banker draws 0-5, stands 6-7
          if (bankerCardsValue < 6) bankerDraw = true;
          break;
          case 6:
          case 7:
          // Player has 6, 7 - banker draws 0-6, stands 7
          if (bankerCardsValue < 7) bankerDraw = true;
          break;
          case 8:
          // Player has 8 - banker draws 0-2, stands 3-7
          if (bankerCardsValue < 3) bankerDraw = true;
          break;
          case 9:
          case 0:
          case 1:
          // Player has 9, T/K/Q/J, A - banker draws 0-3, stands 4-7
          if (bankerCardsValue < 4) bankerDraw = true;
          break;
      }

      // if (bankerCardsValue <= 2) {
      //     bankerDraw = true;
      // }
      // else if (bankerCardsValue == 3 && player3rdCardValue != 8)  {
      //     bankerDraw = true;
      // }
      // else if (bankerCardsValue == 4 && player3rdCardValue >= 2 && player3rdCardValue <= 7) {
      //     bankerDraw = true;
      // }
      // else if (bankerCardsValue == 5 && player3rdCardValue >= 4 && player3rdCardValue <= 7) {
      //     bankerDraw = true;
      // }
      // else if (bankerCardsValue == 6 && playerCardsValue >= 6 && playerCardsValue <= 7) {
      //     bankerDraw = true;
      // }
    }

    if (bankerDraw) {
      let banker3rdCard = this.cardDeck.dealACard();
      this.hand.bankerCards.push(banker3rdCard);
      bankerCardsValue = this.resultsEngine.calculateHandValue(this.hand.bankerCards);
  }

  return this.hand;
  }
}
