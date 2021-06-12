const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const matchLeagueSchema = new Schema({
    iMatchId: { type: mongoose.Types.ObjectId, ref: 'matches', index: true },
    iLeagueId: { type: mongoose.Types.ObjectId, ref: 'leagues' },
    iLeagueCatId: { type: mongoose.Types.ObjectId, ref: 'leaguecategories' },
    iFilterCatId: { type: mongoose.Types.ObjectId, ref: 'filtercategories' },
    sShareLink: { type: String, trim: true },
    sName: { type: String, trim: true, required: true },
    nMax: { type: Number, required: true },
    nMin: { type: Number, required: true },
    nPrice: { type: Number },
    nTotalPayout: { type: Number },
    nDeductPercent: { type: Number },
    nBonusUtil: { type: Number },
    aLeaguePrice: [
        {
            nRankFrom: { type: Number },
            nRankTo: { type: Number },
            nPrice: { type: Number },
            eRankType: { type: String, default: 'R' }, // R = REAL_MONEY, B = BONUS, E = EXTRA
            sInfo: { type: String },
            sImage: { type: String, trim: true },
        },
    ],
    sLeagueCategory: { type: String },
    sFilterCategory: { type: String },
    sPayoutBreakupDesign: { type: String },
    bConfirmLeague: { type: Boolean, default: false },
    bMultipleEntry: { type: Boolean, default: false },
    bAutoCreate: { type: Boolean, default: false },
    bCancelled: { type: Boolean, default: false },
    bPoolPrice: { type: Boolean, default: false },
    bCopyLeague: { type: Boolean },
    eCategory: { type: String, default: 'CRICKET' },
    nPosition: { type: Number },
    nLeaguePrice: { type: Number },
    bPriceDone: { type: Boolean, default: false },
    nWinnersCount: { type: Number },
    nTeamJoinLimit: { type: Number, default: 1 },
    nJoined: { type: Number, default: 0 },
    iUserId: { type: mongoose.Types.ObjectId, ref: 'users' },
    bPrivateLeague: { type: Boolean, default: false }, ///
    sFairPlay: { type: String },
    nAdminCommission: { type: Number },
    nCreatorCommission: { type: Number },
    nLoyaltyPoint: { type: Number, default: 0 },
    sShareCode: { type: String },
    dCreatedAt: { type: Date, default: Date.now },
    dUpdatedAt: { type: Date },
});

module.exports = model('matchleagues', matchLeagueSchema);
