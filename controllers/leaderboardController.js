const Leaderboard = require("../models/leaderboard");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");

// Add score => /api/v1/leaderboard
exports.addScore = catchAsyncErrors(async (req, res, next) => {

    const { player, map, score } = req.body;

    const splitScore = score.split(':')
    const minutes = parseInt(splitScore[0])
    const seconds = parseInt(splitScore[1])
    const milliseconds = parseInt(splitScore[2])

    const scoreDate = new Date(0, 0, 0, 0, minutes, seconds, milliseconds)

    const leaderboard = await Leaderboard.create({
        player,
        map,
        score: scoreDate
    })

    res.status(200).json({
        success: true,
        leaderboard
    })
});

// Get top 10 scores => /api/v1/leaderboard
exports.getScores = catchAsyncErrors(async (req, res, next) => {
    const leaderboard = await Leaderboard.find().sort({ score: 1 }).limit(10)

    const results = []

    leaderboard.forEach((leaderboardLine, index) => {
        const score = `${leaderboardLine.score.getMinutes()}:${leaderboardLine.score.getSeconds()}:${leaderboardLine.score.getMilliseconds()}`
        const player = leaderboardLine.player
        const map = leaderboardLine.map
        results.push({ player, score, map })
    })

    res.status(200).json({
        success: true,
        results,
    })
})