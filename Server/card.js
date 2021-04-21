module.exports = {
    getDecks: function () {
        // declare card elements
        const suits = ["Spades", "Diamonds", "Club", "Heart"];
        const values = [
        "Ace",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "Jack",
        "Queen",
        "King",
        ];

        let deck = []

        // create a deck of cards
        for (let d = 0; d < 10; ++d) {
            for (let i = 0; i < suits.length; i++) {
                for (let x = 0; x < values.length; x++) {
                    let card = { Value: values[x], Suit: suits[i] };
                    deck.push(card);
                }
            }
        }

        // shuffle the cards
        for (let i = deck.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * i);
            let temp = deck[i];
            deck[i] = deck[j];
            deck[j] = temp;
        }
        return deck;
    },

    getRandomIndex: function (max) {
        return Math.floor(Math.random() * max);
    }
};
