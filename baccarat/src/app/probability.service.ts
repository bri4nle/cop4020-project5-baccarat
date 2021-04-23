import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProbabilityService {

  constructor() { }
  // expecting the entire deck array to be passed
  getPlayerProb(deck: any, playerHandValue: number, bankerHandValue: number) {
    let playerOuts = deck.filter(deck => deck.value + playerHandValue >= bankerHandValue).length;
    let playerProb = (playerOuts / deck.length) * 100;

    return playerProb;
  }

  getBankerProb(deck: any, playerHandValue: number, bankerHandValue: number) {
    // TODO: Deck might be array of ints or card objects
    let bankerOuts = deck.filter(card => card + bankerHandValue >= playerHandValue).length;
    let bankerProb = (bankerOuts / deck.length) * 100;

    return bankerProb;
  }
}
