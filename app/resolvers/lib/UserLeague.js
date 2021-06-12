/* eslint-disable no-empty-pattern */
const { UserLeague } = require('../../models');

const resolvers = {
    Query: {
        getUserLeagues: async (_, { input }, {}) => {
            const result = await UserLeague.find({})
                .skip(input.nOffset * input.nLimit)
                .limit(input.nLimit);
            return result;
        },
        getUserLeague: async (_, input, { dataSources }) => {
            const result = await dataSources.userLeagueApi.getUserLeague(input.id);
            return result;
        },
        getUserLeagueByIds: async (_, input, { dataSources }) => {
            const result = await dataSources.userLeagueApi.getUserLeagueByIds(input.id);
            return result;
        },
        // getUserLeagueByFieldName: async (_, { input }, {}) => {
        //     const result = await UserLeague.find({ eCategory: input.value })
        //         .skip(input.nOffset * input.nLimit)
        //         .limit(input.nLimit);
        //     return result;
        // },
    },
};

module.exports = resolvers;
