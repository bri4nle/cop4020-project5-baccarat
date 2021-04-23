import { Injectable } from '@angular/core';
import { HttpClient, JsonpClientBackend } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CardDeckAPIService {

  deck = [];

  constructor(private http: HttpClient) { }

  
  // Get 8 decks from the api
  async getDecks() {
    let response = [];
    for(let i = 0; i < 8; ++i) {
      response = (await this.http.get("https://deckofcardsapi.com/api/deck/new/draw/?count=52", { responseType: 'json' }).toPromise())['cards'];
      // this.deck.push(response);
      for (let card of response) {
        this.deck.push(card);
      }
    }

    console.log(this.deck);
    return this.deck;
  }

  getProbDeck() {
    const probDeck = this.deck.map(card => card.value)
    .map(function(card) {
      if (card == "ACE") {
        return "1"
      }
      else if ((card == "KING") || (card == "QUEEN") || (card == "JACK") || (card == "10")) {
          return "0"
      }
      else {
          return card
      }
    })
    .map(card => parseInt(card))

    console.log(probDeck);
    return probDeck;
  }

  // Put the cards got back from API in to deck
  dealACard() {
    // console.log(this.deck);
    console.log("Deck size = " + this.deck.length);
    return this.deck.pop();
  }
  
  // Get a card from the deck and take out that card from deck
}
