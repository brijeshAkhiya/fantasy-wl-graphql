const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const matchTeamSchema = new Schema({
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

module.exports = model('matchteams', matchTeamSchema);
