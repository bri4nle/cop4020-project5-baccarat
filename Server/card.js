const suits = ['Spades', 'Diamonds', 'Club', 'Heart'];
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
const num_decks = 8

let decks = []

for(let i = 0; i < num_decks; ++i) {
    for(let j = 0; j < suits.length; ++j) {
        for(let k = 0; k < values.length; ++k) {
            let card = {value: values[k], suit: suits[j]};
            decks.push(card)
        }
    }
}

// shuffle the cards
for (let i = decks.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * i);
    let temp = decks[i];
    decks[i] = decks[j];
    decks[j] = temp;
}

console.log('The first five cards are:');

// display 5 results
for (let i = 0; i < 5; i++) {
    console.log(`${decks[i].value} of ${decks[i].suit}`)
}