import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Hand {

    playerCards: any[] = [];
    bankerCards: any[] = [];

    constructor(public pCards: any[], public bCards: any[]) { 
        this.playerCards = pCards;
        this.bankerCards = bCards;
    }

    clearHand() {
      this.playerCards = [];
      this.bankerCards = [];
    }
}