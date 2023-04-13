const express = require('express');
const router = express.Router();

const {
    getScores,
    addScore
} = require('../controllers/leaderboardController');

router.route('/leaderboard')
    .get(getScores)
    .post(addScore);

module.exports = router;