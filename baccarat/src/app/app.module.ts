import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PlayerBoardComponent } from './player-board/player-board.component';
import { TieBetCardComponent } from './tie-bet-card/tie-bet-card.component';

@NgModule({
  declarations: [
    AppComponent,
    PlayerBoardComponent,
    TieBetCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
