const mongoose = require('mongoose');

const HeroShcema = new mongoose.Schema({
  name: String,
  thumbnail: String,
});

module.exports = mongoose.model('Hero', HeroShcema);