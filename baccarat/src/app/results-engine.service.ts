import { Injectable } from '@angular/core';
import { GameResult } from './game-result.constants'
import { Hand } from './hand.service';

@Injectable({
  providedIn: 'root'
})
export class ResultsEngine {


    constructor(public gameResult: GameResult) { }

    /**
     * Calculates results for the baccarat game based on the hand
     * that happened in the game.
     * @param {Hand} hand The hand for the baccarat game played.
     * @return {GameResult} The game result calculated from the hand.
     */
     calculateGameResult(hand: Hand) {
        let result = {
            outcome: this.gameResult.TIE,
            natural: this.gameResult.NO_NATURAL,
            pair: this.gameResult.NO_PAIR,
        };

        result.outcome = this.calculateOutcome(hand);
        result.natural = this.calculateNatural(result.outcome, hand);
        result.pair = this.calculatePairs(hand);

        return result;
    }

    /**
     * Calculates the winning main bet for this game.
     * @param {Hand} The hand for the baccarat game played.
     * @return {String} The outcome
     */
    calculateOutcome({playerCards = [], bankerCards = []}) {
        let playerValue = this.calculateHandValue(playerCards);
        let bankerValue = this.calculateHandValue(bankerCards);

        let difference = bankerValue - playerValue;

        if (difference === 0) return this.gameResult.TIE;
        else if (difference > 0) return this.gameResult.BANKER;
        else return this.gameResult.PLAYER;
    }

    /**
     * Calculates the winning natural bets for this game.
     * @param {String} outcome The outcome for the game played
     * @param {Hand} hand The hand for the baccarat game played.
     * @return {String}
     */
    calculateNatural(outcome: any, {playerCards = [], bankerCards = []}) {
        let cardsToCheck: any;

        switch (outcome) {
            case this.gameResult.PLAYER:
                cardsToCheck = playerCards;
                break;
            case this.gameResult.BANKER:
                cardsToCheck = bankerCards;
                break;
            default:
                return this.gameResult.NO_NATURAL;
        }

        if (cardsToCheck.length === 2) {
            let handValue = this.calculateHandValue(cardsToCheck);

            if (handValue === 8)
                return outcome + '8';
            else if (handValue === 9)
                return outcome + '9';
        }

        return this.gameResult.NO_NATURAL;
    }

    /**
     * Calculates the winning pair bets for the game.
     * @param {Hand} hand The hand for the baccarat game played.
     * @return {String}
     */
    calculatePairs({playerCards = [], bankerCards = []}) {
        const isPlayerPair = this.calculatePair(playerCards);
        const isBankerPair = this.calculatePair(bankerCards);

        if (isPlayerPair && isBankerPair)
            return this.gameResult.BOTH_PAIR;
        else if (isPlayerPair)
            return this.gameResult.PLAYER_PAIR;
        else if (isBankerPair)
            return this.gameResult.BANK_PAIR;
        else
            return this.gameResult.NO_PAIR;
    }

    /**
     * @private
     * @param {Card[]} cards The cards to calculate a pair on
     * @return {Boolean} Calculates rather or not this set of cards is a pair
     */
    calculatePair(cards = []) {
        if (cards.length !== 2)
            return false;

        let [firstCard, secondCard] = cards;

        return firstCard.value === secondCard.value;
    }

    /**
     * Calculates the hand value for the cards played in a baccarat game.
     * @param {Card[]} cards A collection of cards to calculate the baccarat
     *  hand value for.
     * @return {Number} The card value of the cards.
     */
    calculateHandValue(cards: any[]) {
        let cardsValue = cards.reduce((handValue, card) => {
            console.log(card);
            return ResultsEngine.valueForCard(card.value) + handValue;
        }, 0);

        return cardsValue % 10;
    }

    /**
     * @param {Card} card The card to calculate a baccarat hand value for
     * @return {Number} The baccarat hand value
     */
    static valueForCard(value = '0') {
        switch (value) {
            case 'ACE': return 1;
            case '1': return 1;
            case '2': return 2;
            case '3': return 3;
            case '4': return 4;
            case '5': return 5;
            case '6': return 6;
            case '7': return 7;
            case '8': return 8;
            case '9': return 9;
            case '10':
            case '0':
            case 'JACK':
            case 'QUEEN':
            case 'KING':
                return 0;
            default: return 0;
        }
    }
}