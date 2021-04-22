import { Injectable } from '@angular/core';
import { HttpClient, JsonpClientBackend } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CardDeckAPIService {

  deck = [];

  constructor(private http: HttpClient) { }

  
  async drawOneCardFromNewDeck() {
    console.log("calling API");
    let response = await this.http.get("https://deckofcardsapi.com/api/deck/new/draw/?count=52", { responseType: 'json' }).toPromise();
    // console.log(response['cards']);
    this.deck = response['cards'];

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
  }

  // Put the cards got back from API in to deck
  dealACard() {

    return this.deck[0];
  }
  
  // Get a card from the deck and take out that card from deck
}
