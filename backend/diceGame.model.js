const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let PlayerSchema = new Schema({
    name: String,
    score: Number,
    strikes: Number
});

let DieScheme = new Schema({
    held: Boolean,
    value: Number
})

let GameSchema = new Schema({
    accessCode: String,
    dice: [DieScheme],
    players: [PlayerSchema],
    pot: Number
});

const Die = mongoose.model('Die', DieScheme);
const Player = mongoose.model('Player', PlayerSchema);
const Game = mongoose.model('Game', GameSchema);

// module.exports = Player;

module.exports = {
    Die: Die,
    Player: Player,
    Game: Game,
}