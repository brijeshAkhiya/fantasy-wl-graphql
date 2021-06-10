const mongoose = require('mongoose');

const matchPlayerSchema = new mongoose.Schema({
    sKey: { type: String, trim: true },
    iMatchId: { type: mongoose.Types.ObjectId, ref: 'matches', index: true }, // pak match ni id
    iTeamId: { type: mongoose.Types.ObjectId, ref: 'teams' }, // ind
    sTeamName: { type: String, trim: true },
    iPlayerId: { type: mongoose.Types.ObjectId, ref: 'players' }, // jjj
    sImage: { type: String, trim: true },
    sName: { type: String, trim: true },
    sTeamKey: { type: String, trim: true },
    eRole: { type: String, default: 'BATS' },
    nFantasyCredit: { type: Number, default: 9 },
    nScoredPoints: { type: Number, default: 0 }, // 9
    nSeasonPoints: { type: Number, default: 0 },
    aPointBreakup: [
        {
            sKey: { type: String, trim: true },
            sName: { type: String, trim: true },
            nPoint: { type: Number },
            nScoredPoints: { type: Number, default: 0 },
        },
    ],
    nSetBy: { type: Number, default: 0 },
    nCaptainBy: { type: Number, default: 0 },
    nViceCaptainBy: { type: Number, default: 0 },
    bShow: { type: Boolean, default: false },
    dUpdatedAt: { type: Date },
    dCreatedAt: { type: Date, default: Date.now },
});

const MatchPlayer = mongoose.model('matchplayers', matchPlayerSchema);
module.exports = MatchPlayer;
