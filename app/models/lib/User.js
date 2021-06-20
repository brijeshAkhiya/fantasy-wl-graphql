const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const User = new Schema({
    sName: { type: String, trim: true },
    sUsername: { type: String, trim: true, required: true, unique: true },
    sEmail: { type: String, trim: true, unique: true },
    bIsEmailVerified: { type: Boolean, default: false },
    sMobNum: { type: String, trim: true, required: true },
    bIsMobVerified: { type: Boolean, default: false },
    sProPic: { type: String, trim: true },
    eType: { type: String, default: 'U' }, // U = USER B = BOT
    eGender: { type: String },
    aJwtTokens: [
        {
            sToken: { type: String },
            sPushToken: { type: String, trim: true },
            dTimeStamp: { type: Date, default: Date.now },
        },
    ],
    oSocial: {
        sType: { type: String },
        sId: { type: String },
        sToken: { type: String },
    },
    sState: { type: String },
    dDob: { type: Date },
    sCity: { type: String },
    sAddress: { type: String },
    nPinCode: { type: Number },
    aDeviceToken: { type: Array },
    eStatus: { type: String, default: 'Y' },
    iReferredBy: { type: Schema.Types.ObjectId, ref: 'users' },
    sReferCode: { type: String },
    sReferLink: { type: String },
    dLoginAt: { type: Date },
    dPasswordchangeAt: { type: Date },
    sPassword: { type: String, trim: true, required: true },
    sVerificationToken: { type: String },
    dUpdatedAt: { type: Date },
    dCreatedAt: { type: Date, default: Date.now },
});

module.exports = model('users', User);
