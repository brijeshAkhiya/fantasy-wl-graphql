const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const userLeagueSchema = new Schema({
    iUserTeamId: { type: mongoose.Types.ObjectId, ref: 'userteams' },
    iUserId: { type: mongoose.Types.ObjectId, ref: 'users' },
    iMatchLeagueId: { type: mongoose.Types.ObjectId, ref: 'matchleagues' },
    iMatchId: { type: mongoose.Types.ObjectId, ref: 'matches' },
    nTotalPayout: { type: Number },
    nPoolPrice: { type: Boolean, default: false },
    nTotalPoints: { type: Number },
    sPayoutBreakupDesign: { type: String },
    nRank: { type: Number },
    nPrice: { type: Number },
    sUserName: { type: String, trim: true },
    sProPic: { type: String, trim: true },
    sTeamName: { type: String, trim: true },
    sMatchName: { type: String, trim: true },
    sLeagueName: { type: String, trim: true },
    ePlatform: { type: String, required: true }, // A = Android, I = iOS, W = Web, O = Other, AD = Admin
    dUpdatedAt: { type: Date },
    dCreatedAt: { type: Date, default: Date.now },
});

module.exports = model('userleagues', userLeagueSchema);
