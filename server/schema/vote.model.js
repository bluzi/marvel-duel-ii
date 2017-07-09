const mongoose = require('mongoose');

const VoteSchema = new mongoose.Schema({
    duel: { type: mongoose.Schema.Types.ObjectId, ref: 'Duel' },
    hero: { type: mongoose.Schema.Types.ObjectId, ref: 'Hero' },
});

module.exports = mongoose.model('Vote', VoteSchema);