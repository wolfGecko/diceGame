const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Player = new Schema({
    name: String,
    score: Number,
    strikes: Number,
});

module.exports = mongoose.model('Player', Player);