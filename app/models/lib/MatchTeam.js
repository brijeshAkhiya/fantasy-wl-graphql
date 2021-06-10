const mongoose = require('mongoose');

const matchTeamSchema = new mongoose.Schema({
    iMatchId: { type: mongoose.Types.ObjectId, ref: 'matches' },
    aPlayers: [
        {
            iMatchPlayerId: { type: mongoose.Types.ObjectId, ref: 'matchplayers' },
            iTeamId: { type: mongoose.Types.ObjectId, ref: 'teams' },
            nScoredPoints: { type: Number, default: 0 },
        },
    ],
    nTotalPoint: { type: Number },
    nTotalCredit: { type: Number },
    sHash: { type: String, trim: true },
    eCategory: { type: String, default: 'CRICKET' },
    dUpdatedAt: { type: Date },
    dCreatedAt: { type: Date, default: Date.now },
});

const MatchTeam = mongoose.model('matchteams', matchTeamSchema);
module.exports = MatchTeam;
