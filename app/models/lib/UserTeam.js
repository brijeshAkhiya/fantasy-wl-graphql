const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const userTeam = new Schema({
    iMatchId: { type: mongoose.Types.ObjectId, ref: 'matches' },
    iUserId: { type: mongoose.Types.ObjectId, ref: 'users' },
    sName: { type: String, trim: true, required: true },
    iCaptainId: { type: mongoose.Types.ObjectId, ref: 'matchplayers', required: true },
    iViceCaptainId: { type: mongoose.Types.ObjectId, ref: 'matchplayers', required: true },
    nTotalPoints: { type: Number },
    sHash: { type: String, trim: true },
    bPointCalculated: { type: Boolean, default: false },
    dUpdatedAt: { type: Date },
    dCreatedAt: { type: Date, default: Date.now },
});

module.exports = model('userteams', userTeam);
