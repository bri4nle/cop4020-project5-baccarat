import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-banker-bet-card',
  templateUrl: './banker-bet-card.component.html',
  styleUrls: ['./banker-bet-card.component.css']
})
export class BankerBetCardComponent implements OnInit {

  isChosen = false;

  constructor() { }

  ngOnInit(): void {
  }

  setBankerBet() {
    this.isChosen = true;
  }

  isPicked() {
    return this.isChosen;
  }

}
