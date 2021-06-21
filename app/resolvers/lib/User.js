/* eslint-disable no-empty-pattern */
const { User } = require('../../models');
const { crypto, jwt, redisPubsub } = require('../../helpers');

const resolvers = {
    Query: {},
    Mutation: {
        userLogin: async (_, { input }, {}) => {
            try {
                const findQuery = {
                    sMobNum: input.sMobNumber,
                    eStatus: 'Y',
                };
                const user = await User.findOne(findQuery);
                if (!user) throw new Error('User Not Found');
                if (!(user.bIsEmailVerified || user.bIsMobVerified)) throw new Error('User Account not verified');
                if (user.sPassword !== crypto.encryptPassword(input.sPassword)) throw new Error('Password Incorrect');
                const sToken = jwt.encodeToken({ iUserId: user._id, eType: user.eType }, { expiresIn: '30d' });
                const updateQuery = {
                    aJwtTokens: {
                        sToken,
                    },
                };
                const update = await User.updateOne(findQuery, updateQuery, { upsert: true }).lean();
                if (!update.nModified) throw new Error('Please Try Again!!!');
                const payload = {
                    sApiName: 'userLogin',
                    calledBy: user.sEmail,
                };
                redisPubsub.publish('apiTrigger', { getApiTrigger: payload });
                return sToken;
            } catch (error) {
                return error;
            }
        },
    },
    Subscription: {
        getApiTrigger: {
            subscribe: () => redisPubsub.asyncIterator(['apiTrigger']),
        },
    },
};

module.exports = resolvers;
