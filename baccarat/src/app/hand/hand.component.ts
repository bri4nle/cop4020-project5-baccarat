import { Component, Input, OnInit } from '@angular/core';
import { ResultsEngine } from '../results-engine.service';

@Component({
  selector: 'app-hand',
  templateUrl: './hand.component.html',
  styleUrls: ['./hand.component.css']
})
export class HandComponent implements OnInit {
  @Input() hand;
  @Input() boardName;
  @Input() value;
  @Input() prob;


  constructor(private results: ResultsEngine) { }

  ngOnInit(): void {
  }

}
