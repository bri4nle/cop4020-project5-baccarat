import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class GameResult {
    /**
     * A tie win outcome
     */
    public TIE = 'tie';
    /**
     * A banker win outcome
     */
    public BANKER = 'banker';
    /**
     * A player win outcome
     */
    public PLAYER = 'player';
    /**
     * A player natural 8
     */
    public PLAYER_NATURAL8 = 'player8';
    /**
     * A player natural 9
     */
    public PLAYER_NATURAL9 = 'player9';
    /**
     * A banker natural 8
     */
    public BANKER_NATURAL8 = 'banker8';
    /**
     * A banker natural 9
     */
    public BANKER_NATURAL9 = 'banker9';
    /**
     * A no natural result
     */
    public NO_NATURAL = 'none';
    /**
     * A player pair
     */
    public PLAYER_PAIR = 'player';
    /**
     * A banker pair
     */
    public BANK_PAIR = 'banker';
    /**
     * A pair for both player and banker
     */
    public BOTH_PAIR = 'both';
    /**
     * A no pair result
     */
    public NO_PAIR = 'none';
}