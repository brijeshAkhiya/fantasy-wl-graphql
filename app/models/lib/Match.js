const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const schema = new Schema({
    sKey: { type: String, trim: true },
    eFormat: { type: String },
    sName: { type: String, trim: true },
    sSeasonKey: { type: String, trim: true },
    sVenue: { type: String, trim: true },
    eStatus: { type: String, default: 'P' },
    dStartDate: { type: Date, required: true },
    oHomeTeam: {
        iTeamId: { type: mongoose.Types.ObjectId, ref: 'teams' },
        sKey: { type: String, trim: true, required: true },
        sName: { type: String, trim: true },
        sShortName: { type: String },
        sImage: { type: String, trim: true },
        nScore: { type: String },
    },
    oAwayTeam: {
        iTeamId: { type: mongoose.Types.ObjectId, ref: 'teams' },
        sKey: { type: String, trim: true, required: true },
        sName: { type: String, trim: true },
        sShortName: { type: String },
        sImage: { type: String, trim: true },
        nScore: { type: String },
    },
    sWinning: { type: String },
    iTossWinnerId: { type: mongoose.Types.ObjectId, ref: 'teams' },
    eTossWinnerAction: { type: String },
    bMatchOnTop: { type: Boolean, default: false },
    eCategory: { type: String, default: 'CRICKET' },
    sInfo: { type: String, trim: true },
    aPlayerRole: [
        {
            sName: { type: String, trim: true, required: true },
            nMax: { type: Number, required: true },
            nMin: { type: Number, required: true },
        },
    ],
    iSeriesId: { type: mongoose.Types.ObjectId, ref: 'seriesleaderboards' },
    bDisabled: { type: Boolean, default: false },
    bInReview: { type: Boolean, default: false },
    eProvider: { type: String, default: 'CUSTOM' },
    bLineupsOut: { type: Boolean, default: false },
    sFantasyPost: { type: String },
    sStreamUrl: { type: String, trim: true },
    dUpdatedAt: { type: Date },
    dCreatedAt: { type: Date, default: Date.now },
});

module.exports = model('matches', schema);
