const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const PORT = 4000;

//routes
const gameRoutes = express.Router();
const playerRoutes = express.Router();
const dieRoutes = express.Router();

// schemas
const { Game } = require('./diceGame.model');
const { Player } = require('./diceGame.model');
const { Die } = require('./diceGame.model');

app.use(cors());
app.use(bodyParser.json());

// connect mongoose to mongoDB
mongoose.connect('mongodb://127.0.0.1:27017/diceGame', { useNewUrlParser: true });
const connection = mongoose.connection;
// log successful connection
connection.once('open', function () {
    console.log(new Player())
    console.log('MongoDB database connection established successfully, my dude.');
});

// game end points
// find all games
gameRoutes.route('/').get(function (req, res) {
    Game.find(function (err, games) {
        if (err) {
            console.log(err);
        } else {
            res.json(games);
        }
    });
});
// find game by accessCode
gameRoutes.route('/find/:accessCode').get(function (req, res) {
    Game.find({ accessCode: req.params.accessCode }, function (err, games) {
        if (err) console.log(err);
        else {
            if (games.length === 0) res.status(404).send('Game not found.');
            else {
                res.status(200).json(games[0]);
            }
        }
    });
});
// create new game
gameRoutes.route('/new').post(function (req, res) {
    let game = new Game(req.body);
    console.log(game);
    game.save().then(() => {
        res.status(200).json(game);
    }).catch(err => {
        res.status(400).send('Adding new game failed.', err);
    });
});
// add player
gameRoutes.route('/find/:accessCode/add-player').post(function (req, res) {
    Game.find({ accessCode: req.params.accessCode }, function (err, games) {
        if (err) console.log(err);
        else {
            if (games.length === 0) res.status(404).send('Game not found.');
            else {
                let game = games[0];
                game.players.push({
                    name: req.body.name,
                    score: req.body.score,
                    strikes: req.body.strikes
                });
                game.save().then(() => {
                    res.send('Player added');
                }).catch(err => {
                    res.status(400).send('Player add failed');
                    console.log(err);
                })
                // res.status(200).json(games[0]);
            }
        }
    });
});
// roll dice
        gameRoutes.route('/find/:accessCode/roll').post(function (req, res) {
            Game.find({ accessCode: req.params.accessCode }, function (err, games) {
                if (err) console.log(err);
                else {
                    if (games.length === 0) res.status(404).send('Game not found.');
                    else {
                        let game = games[0];
                        const toBeRolled = req.body.toBeRolled;
                        toBeRolled.forEach(die => {
                            // find each die and give it a random value between 1 and 6
                        });
                        game.save().then(() => {
                            res.send(toBeRolled);
                        }).catch(err => {
                            res.status(400).send('Player add failed');
                            console.log(err);
                        })
                        // res.status(200).json(games[0]);
                    }
                }
            });
        });
// player end points
// get all players
playerRoutes.route('/').get(function (req, res) {
    Player.find(function (err, players) {
        if (err) {
            console.log(err);
        } else {
            res.json(players);
        }
    });
});
// add new player
playerRoutes.route('/add').post(function (req, res) {
    let player = new Player(req.body);
    player.save().then(() => {
        res.status(200).send('New player added.');
    }).catch(err => {
        res.status(400).send('Adding new player failed.', err);
    });
});
// update player
playerRoutes.route('/update/:id').post(function (req, res) {
    Player.findById(req.params.id, function (err, player) {
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
});

// use routes -- these have to be down here otherwise the req body is undefined
app.use('/game', gameRoutes);
app.use('/player', playerRoutes);
app.use('/die', dieRoutes);

app.listen(PORT, function () {
    console.log('Server is running on Port: ' + PORT);
});