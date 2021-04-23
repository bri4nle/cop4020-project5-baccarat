import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-hand',
  templateUrl: './hand.component.html',
  styleUrls: ['./hand.component.css']
})
export class HandComponent implements OnInit {
  @Input() hand;
  @Input() boardName;
  
  constructor() { }

  ngOnInit(): void {
  }

}
