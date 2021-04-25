import { Component, Input, OnInit } from '@angular/core';
import { ResultsEngine } from '../results-engine.service';

@Component({
  selector: 'app-hand',
  templateUrl: './hand.component.html',
  styleUrls: ['./hand.component.css']
})
export class HandComponent implements OnInit {
  @Input() hand: [];
  @Input() boardName;
  @Input() value;
  @Input() prob;

  // selectedArray: [] = [];

  constructor(private results: ResultsEngine) { }
  
  ngOnInit(): void {
    // this.getArrayValues(0);
  }

  // getArrayValues(index) {
  //   console.log("In getArrayValues");
  //   setInterval(() => {
  //     if(index == this.hand.length)
  //       return;
  //     this.selectedArray.push(this.hand[index]);
  //     index++;
  //   }, 5000);
  // }

}
