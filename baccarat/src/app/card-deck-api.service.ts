import { Injectable } from '@angular/core';
import { HttpClient, JsonpClientBackend } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CardDeckAPIService {

  constructor(private http: HttpClient) { }

  drawOneCardFromNewDeck() {
    let response = this.http.get("https://deckofcardsapi.com/api/deck/new/draw/?count=1", { responseType: 'json' });
    console.log(response);
  }
}
