import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PlayerBoardComponent } from './player-board/player-board.component';
import { TieBetCardComponent } from './tie-bet-card/tie-bet-card.component';
import { BankerBetCardComponent } from './banker-bet-card/banker-bet-card.component';
import { PlayerBetCardComponent } from './player-bet-card/player-bet-card.component';
import { HandComponent } from './hand/hand.component';
import { HttpClientModule} from '@angular/common/http';
import { StartButtonComponent } from './start-button/start-button.component';
import { GameBoardComponent } from './game-board/game-board.component';

@NgModule({
  declarations: [
    AppComponent,
    PlayerBoardComponent,
    TieBetCardComponent,
    BankerBetCardComponent,
    PlayerBetCardComponent,
    HandComponent,
    StartButtonComponent,
    GameBoardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
