import { Injectable } from '@angular/core';
import { HttpClient, JsonpClientBackend } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CardDeckAPIService {

  constructor(private http: HttpClient) { }

  
  async drawOneCardFromNewDeck() {
    console.log("calling API");
    let response = await this.http.get("https://deckofcardsapi.com/api/deck/new/draw/?count=52", { responseType: 'json' }).toPromise();
    console.log(response);
    
  }
}
