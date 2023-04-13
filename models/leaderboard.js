const mongoose = require('mongoose');

const leaderboardSchema = new mongoose.Schema({
    player: {
        type: 'String',
        required: [true, 'Entrez un nom de joueur'],
    },
    map: {
        type: 'String',
        required: [true, 'Entrez un nom de carte'],
        enum: ['stage1', 'stage2', 'stage3', 'stage4'],
    },
    score: {
        type: 'Date',
        required: [true, 'Entrez un score'],
    },
})

module.exports = mongoose.model('Leaderboard', leaderboardSchema);