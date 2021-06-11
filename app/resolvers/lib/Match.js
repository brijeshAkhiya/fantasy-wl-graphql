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
            const result = await dataSources.matchApi.getMatch(input.id);
            console.log(dataSources.matchApi.context);
            return result;
        },
    },
};

module.exports = resolvers;
