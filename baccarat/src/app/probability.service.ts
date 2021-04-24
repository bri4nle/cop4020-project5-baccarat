import { collectExternalReferences } from '@angular/compiler';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProbabilityService {

  constructor() { }
  // expecting the entire deck array to be passed
  getPlayerProb(deck: any, playerHandValue: number, bankerHandValue: number) {
    let playerWinOuts = deck.filter(card => ((card + playerHandValue) % 10) > bankerHandValue).length;
    let playerWinOutsArr = deck.filter(card => (card + playerHandValue) % 10 > bankerHandValue);
    let tieOuts = deck.filter(card => (card + playerHandValue) % 10 == bankerHandValue).length;
    let tieProb = tieOuts / deck.length;
    let playerProb = (playerWinOuts / deck.length) * 100 - tieProb;
    let bankerProb = 100 - playerProb - tieProb;
    let tieArr = deck.filter(card => (card + playerHandValue) % 10 == bankerHandValue);

    if (playerWinOuts == 0) {
      playerProb = 0;
    }
    console.log("printing tie arr:");
    console.log(tieArr);
    console.log("Player's outs = " + playerWinOuts);
    console.log("Tie outs = " + tieOuts);
    console.log('printing deck');
    console.log(deck);
    console.log("printing player wins out arr");
    console.log(playerWinOutsArr);

    return [playerProb, bankerProb, tieProb];
  }

  getBankerProb(deck: any, playerHandValue: number, bankerHandValue: number) {
    let bankerOuts = deck.filter(card => ((card + bankerHandValue) % 10) > playerHandValue).length;
    let bankerOutsArr = deck.filter(card => (card + bankerHandValue) % 10 > playerHandValue);
    let tieOuts = deck.filter(card => (card + playerHandValue) % 10 == bankerHandValue).length;
    let tieProb = tieOuts / deck.length;
    let bankerProb = (bankerOuts / deck.length) * 100 - tieProb;
    let playerProb = 100 - bankerProb - tieProb;
    let tieArr = deck.filter(card => (card + playerHandValue) % 10 == bankerHandValue);

    if (bankerOuts == 0) {
      bankerProb = 0;
    }
    console.log("printing tie arr");
    console.log(tieArr);
    console.log("Banker's outs = " + bankerOuts);
    console.log("Tie outs = " + tieOuts);
    console.log('printing deck');
    console.log(deck);
    console.log("printing banker wins out arr");
    console.log(bankerOutsArr);

    return [playerProb, bankerProb, tieProb];
  }
}
