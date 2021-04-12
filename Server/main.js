const express = require('express');
let decks = require("./card")

let app = express();
let cards = decks.getDecks();
let index = 0;

// set up handlebars view engine
let handlebars = require('express-handlebars')
	.create({ defaultLayout:'main' });
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.set('port', process.env.PORT || 3000);

app.use(express.static(__dirname + '/public'));

app.get('/api/card', (req, res) => {
	if (cards.length == 0)
		cards = decks.getDecks();
	let index = decks.getRandomIndex(cards.length);
	let card = cards[index];
	console.log("Index: ", index);
	console.log("length of cards: ", cards.length);
	cards.splice(index, 1);
	res.send(card);
});

app.get('/', function(req, res) {
	res.render('home');
});

// 404 catch-all handler (middleware)
app.use(function(req, res, next){
	res.status(404);
	res.render('404');
});

// 500 error handler (middleware)
app.use(function(err, req, res, next){
	console.error(err.stack);
	res.status(500);
	res.render('500');
});

app.listen(app.get('port'), function(){
  console.log( 'Express started on http://localhost:' +
    app.get('port') + '; press Ctrl-C to terminate.' );
});