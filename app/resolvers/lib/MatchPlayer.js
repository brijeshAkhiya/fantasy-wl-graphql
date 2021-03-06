/* eslint-disable no-empty-pattern */
const { ObjectId } = require('mongoose').Types;
const { MatchPlayer } = require('../../models');
const { redisPubsub } = require('../../helpers');

const resolvers = {
    Subscription: {
        getApiTrigger: {
            subscribe: () => redisPubsub.asyncIterator(['apiTrigger']),
        },
    },
    Query: {
        getMatchPlayers: async (_, { input }, context) => {
            const result = await MatchPlayer.find({})
                .skip(input.nOffset * input.nLimit)
                .limit(input.nLimit);
            const payload = {
                sApiName: 'getMatchPlayers',
                calledBy: context.user.sEmail,
            };
            redisPubsub.publish('apiTrigger', { getApiTrigger: payload });
            return result;
        },
        getMatchPlayer: async (_, input, context) => {
            // const result = await dataSources.matchPlayerApi.getMatchPlayer(input);
            const result = await MatchPlayer.findOne({ _id: ObjectId(input._id) });
            const payload = {
                sApiName: 'getMatchPlayer',
                calledBy: context.user.sEmail,
            };
            redisPubsub.publish('apiTrigger', { getApiTrigger: payload });
            return result;
        },
        // getMatchPlayerByIds: async (_, input, { dataSources }) => {
        //     const result = await dataSources.matchPlayerApi.getMatchPlayerByIds(input.id);
        //     return result;
        // },
        // getMatchPlayerByFieldName: async (_, { input }, {}) => {
        //     const result = await MatchPlayer.find({ sTeamName: input.value })
        //         .skip(input.nOffset * input.nLimit)
        //         .limit(input.nLimit);
        //     return result;
        // },
    },
};

module.exports = resolvers;
