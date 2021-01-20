const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const playerRoutes = express.Router();
const PORT = 4000;

// require Player schema
let Player = require( './diceGame.model')

app.use(cors());
app.use(bodyParser.json());

// connect mongoose to mongoDB
mongoose.connect('mongodb://127.0.0.1:27017/diceGame', { useNewUrlParser: true });
const connection = mongoose.connection;
// log successful connection
connection.once('open', function() {
    console.log('MongoDB database connection established successfully, my dude.');
});

// end points
// get all players
playerRoutes.route('/').get(function(req, res) {
    Player.find(function(err, players) {
        if (err) {
            console.log(err);
        } else {
            res.json(players);
        }
    });
});
// add new player
playerRoutes.route('/add').post(function(req, res) {
    let player = new Player(req.body);
    player.save().then(() => {
        res.status(200).send('New player added.');
    }).catch(err => {
        res.status(400).send('Adding new player failed.', err);
    });
});
// update player
playerRoutes.route('/update/:id').post(function(req, res) {
    Player.findById(req.params.id, function(err, player) {
        if (!player) res.status(404).send('Player not found.');
        else {
            player.name = req.body.name;
            player.score = req.body.score;
            player.strikes = req.body.strikes;

            player.save().then(() => {
                res.json('Player updated.')
            }).catch(err => {
                res.status(400).send('Player update failed.')
            })
        }
    });
})



app.use('/player', playerRoutes);

app.listen(PORT, function() {
    console.log('Server is running on Port: ' + PORT);
});