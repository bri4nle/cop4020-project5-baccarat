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
      response.push(await this.http.get("https://deckofcardsapi.com/api/deck/new/draw/?count=52", { responseType: 'json' }).toPromise());
    }
    this.deck = response['cards'];
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
    let card = this.deck[0];
    this.deck.pop();
    return card;
  }
  
  // Get a card from the deck and take out that card from deck
}
