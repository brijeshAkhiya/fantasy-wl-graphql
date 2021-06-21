/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-empty-pattern */
const { ObjectId } = require('mongoose').Types;
const { redisPubsub } = require('../../helpers');
const { MatchLeague } = require('../../models');

const resolvers = {
    Subscription: {
        getApiTrigger: {
            subscribe: () => redisPubsub.asyncIterator(['apiTrigger']),
        },
    },
    Query: {
        getMatchLeagues: async (_, { input }, context) => {
            const result = await MatchLeague.find({})
                .skip(input.nOffset * input.nLimit)
                .limit(input.nLimit);
            const payload = {
                sApiName: 'getMatchLeagues',
                calledBy: context.user.sEmail,
            };
            redisPubsub.publish('apiTrigger', { getApiTrigger: payload });
            return result;
        },
        getMatchLeague: async (_, input, context) => {
            // const result = await dataSources.matchLeagueApi.getMatchLeague(input);
            const result = await MatchLeague.findOne({ _id: ObjectId(input._id) });
            const payload = {
                sApiName: 'getMatchLeague',
                calledBy: context.user.sEmail,
            };
            redisPubsub.publish('apiTrigger', { apiTrigger: payload });
            return result;
        },
        // getMatchLeagueByIds: async (_, input, { dataSources }) => {
        //     const result = await dataSources.matchLeagueApi.getMatchLeaguesByIds(input.id);
        //     return result;
        // },
        // getMatchLeagueByFieldName: async (_, { input }, {}) => {
        //     const result = await MatchLeague.find({ eCategory: input.value })
        //         .skip(input.nOffset * input.nLimit)
        //         .limit(input.nLimit);
        //     return result;
        // },
    },
};

module.exports = resolvers;
