/* eslint-disable no-empty-pattern */
const { Match } = require('../../models');

const resolvers = {
    Query: {
        getMatches: async (_, { input }, {}) => {
            const result = await Match.find({})
                .skip(input.nOffset * input.nLimit)
                .limit(input.nLimit);
            return result;
        },
        getMatch: async (_, input, { dataSources }) => {
            const result = await dataSources.matchApi.getMatch(input._id);
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
