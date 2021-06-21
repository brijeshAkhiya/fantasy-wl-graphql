/* eslint-disable no-empty-pattern */
const { Match } = require('../../models');
const { redisPubsub } = require('../../helpers');

const resolvers = {
    Subscription: {
        getApiTrigger: {
            subscribe: () => redisPubsub.asyncIterator(['apiTrigger']),
        },
    },
    Query: {
        getMatches: async (_, { input }, context) => {
            const result = await Match.find({})
                .skip(input.nOffset * input.nLimit)
                .limit(input.nLimit);
            const payload = {
                sApiName: 'getMatches',
                calledBy: context.user.sEmail,
            };
            redisPubsub.publish('apiTrigger', { getApiTrigger: payload });
            return result;
        },
        getMatch: async (_, input, context) => {
            const result = await context.dataSources.matchApi.getMatch(input._id);
            // const payload = {
            //     sApiName: 'getMatches',
            //     calledBy: context.user.sEmail,
            // };
            // pubsub.publish('apiTrigger', { apiTrigger: payload });
            return result;
        },
        // getMatchesByIds: async (_, input, { dataSources }) => {
        //     const result = await dataSources.matchApi.getMatchesByIds(input.id);
        //     return result;
        // },
        // getMatchByFieldName: async (_, { input }, { dataSources }) => {
        //     const result = await dataSources.matchApi.getMatchByField(input);
        //     return result.slice(input.nOffset * input.nLimit, input.nLimit);
        // },
    },
};

module.exports = resolvers;
