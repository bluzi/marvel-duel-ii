const mongoose = require('mongoose');

const DuelSchema = new mongoose.Schema({
  heroes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Hero' }],
});

module.exports = mongoose.model('Duel', DuelSchema);