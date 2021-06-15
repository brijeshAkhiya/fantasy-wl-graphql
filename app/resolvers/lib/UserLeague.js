/* eslint-disable no-empty-pattern */
const { ObjectId } = require('mongoose').Types;
const { UserLeague } = require('../../models');

const resolvers = {
    Query: {
        getUserLeagues: async (_, { input }, {}) => {
            const result = await UserLeague.find({})
                .skip(input.nOffset * input.nLimit)
                .limit(input.nLimit);
            return result;
        },
        getUserLeague: async (_, { input }, { dataSources }) => {
            // const result = await dataSources.userLeagueApi.getUserLeague(input);
            const result = await UserLeague.find({ iUserId: ObjectId(input.iUserId) })
                .skip(input.nOffset * input.nLimit)
                .limit(input.nLimit);
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
