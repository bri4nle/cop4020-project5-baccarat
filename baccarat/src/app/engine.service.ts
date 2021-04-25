import { Injectable } from '@angular/core';
import { BankerBetCardComponent } from './banker-bet-card/banker-bet-card.component';
import { CardDeckAPIService } from './card-deck-api.service';
import { Hand } from './hand.service';
import { PlayerBetCardComponent } from './player-bet-card/player-bet-card.component';
import { ProbabilityService } from './probability.service';
import { ResultsEngine } from './results-engine.service';
import { TieBetCardComponent } from './tie-bet-card/tie-bet-card.component';

@Injectable({
  providedIn: 'root'
})
export class EngineService {

  deck: []
  playerProb: number;
  bankerProb: number;
  tieProb: number;
  betStatus: string

  constructor(public cardDeck: CardDeckAPIService, 
              public hand: Hand,
              public resultsEngine: ResultsEngine,
              public probService: ProbabilityService) { }

  async initDeck() {
    await this.cardDeck.getDecksFromAPI();
  }

  getDeck() {
    return this.cardDeck.deck;  
  }

  getProbDeck() {
    return this.cardDeck.getProbDeck();
  }

  setBet(bet: string) {
    this.betStatus = bet;
  }

  getBet() {
    return this.betStatus;
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

    let bankerStands = false;
    if (bankerCardsValue == 6 || bankerCardsValue == 7) {
      bankerStands = true;
    }

    let bankerDraw = false;

    // Natural (Dealer or Player drew an 8 or 9) - neither side draws, game over.
    if (bankerCardsValue > 7 || playerCardsValue > 7) {
      this.bankerProb = 45.80;
      this.playerProb = 44.60;
      this.tieProb = 9.60;
      console.log("Player's prob = " + this.playerProb);
      console.log("Banker's prob = " + this.bankerProb);
      console.log("Tie prob = " + this.tieProb);
      return this.hand;
    }
    // Player has 6 or 7 - stands
    else if (playerCardsValue > 5) {
      // Player stood so dealer draws with [0-5] and stands with 6 or 7
      if (bankerStands) {
        this.bankerProb = 45.80;
        this.playerProb = 44.60;
        this.tieProb = 9.60;
        console.log("Player's prob = " + this.playerProb);
        console.log("Banker's prob = " + this.bankerProb);
        console.log("Tie prob = " + this.tieProb);
      }
      if (bankerCardsValue <= 5) {
          bankerDraw = true;
      }
    }
    // Player has 0 - 5, draws 3rd card
    else  {
      if(bankerStands) {
        [this.playerProb, this.bankerProb, this.tieProb] = this.probService.getPlayerProb(
                                                            this.cardDeck.getProbDeck(), 
                                                            playerCardsValue, 
                                                            bankerCardsValue
                                                            );
      }
      let player3rdCard = this.cardDeck.dealACard();
      this.hand.playerCards.push(player3rdCard);
      let player3rdCardValue =  ResultsEngine.valueForCard(player3rdCard);
      switch (player3rdCardValue) {
          case 2:
          case 3:
          // Player has 2, 3 - banker draws 0-4, stands 5-7
          if (bankerCardsValue < 5) bankerDraw = true;
          else {
            [this.playerProb, this.bankerProb, this.tieProb] = this.probService.getPlayerProb(
                                                                this.cardDeck.getProbDeck(), 
                                                                playerCardsValue, 
                                                                bankerCardsValue
                                                                );
          }
          break;
          case 4:
          case 5:
          // Player has 4, 5 - banker draws 0-5, stands 6-7
          if (bankerCardsValue < 6) bankerDraw = true;
          else {
            [this.playerProb, this.bankerProb, this.tieProb] = this.probService.getPlayerProb(
                                                                this.cardDeck.getProbDeck(), 
                                                                playerCardsValue, 
                                                                bankerCardsValue
                                                                );
          }
          break;
          case 6:
          case 7:
          // Player has 6, 7 - banker draws 0-6, stands 7
          if (bankerCardsValue < 7) bankerDraw = true;
          else {
            [this.playerProb, this.bankerProb, this.tieProb] = this.probService.getPlayerProb(
                                                                this.cardDeck.getProbDeck(), 
                                                                playerCardsValue, 
                                                                bankerCardsValue
                                                                );
          }
          break;
          case 8:
          // Player has 8 - banker draws 0-2, stands 3-7
          if (bankerCardsValue < 3) bankerDraw = true;
          else {
            [this.playerProb, this.bankerProb, this.tieProb] = this.probService.getPlayerProb(
                                                                this.cardDeck.getProbDeck(), 
                                                                playerCardsValue, 
                                                                bankerCardsValue
                                                                );
          }
          break;
          case 9:
          case 0:
          case 1:
          // Player has 9, T/K/Q/J, A - banker draws 0-3, stands 4-7
          if (bankerCardsValue < 4) bankerDraw = true;
          else {
            [this.playerProb, this.bankerProb, this.tieProb] = this.probService.getPlayerProb(
                                                                this.cardDeck.getProbDeck(), 
                                                                playerCardsValue, 
                                                                bankerCardsValue
                                                                );
          }
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
      playerCardsValue = this.resultsEngine.calculateHandValue(this.hand.playerCards);
      console.log("updating player's value: " + playerCardsValue);
      [this.playerProb, this.bankerProb, this.tieProb] = this.probService.getBankerProb(
                                                          this.cardDeck.getProbDeck(), 
                                                          playerCardsValue, 
                                                          bankerCardsValue
                                                          );
      let banker3rdCard = this.cardDeck.dealACard();
      this.hand.bankerCards.push(banker3rdCard);
      bankerCardsValue = this.resultsEngine.calculateHandValue(this.hand.bankerCards);
    }
    else {
      [this.playerProb, this.bankerProb, this.tieProb] = this.probService.getPlayerProb(
                                                         this.cardDeck.getProbDeck(), 
                                                         playerCardsValue, 
                                                         bankerCardsValue
                                                         );
    }

    console.log("Player's value in dealGame() = " + playerCardsValue);

    console.log("Player's prob = " + this.playerProb);
    console.log("Banker's prob = " + this.bankerProb);
    console.log("Tie prob = " + this.tieProb);

    return this.hand;
  }

  getProbs() {
    return [this.round(this.playerProb), this.round(this.bankerProb), this.round(this.tieProb)];
  }

  round(n: number) {
    return Math.round(n * Math.pow(10, 2)) / Math.pow(10, 2)
  }
}
