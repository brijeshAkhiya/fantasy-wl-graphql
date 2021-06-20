/* eslint-disable no-empty-pattern */
const { ObjectId } = require('mongoose').Types;
const { UserLeague } = require('../../models');

const resolvers = {
    Query: {
        getUserLeagues: async (_, { input }, {}) => {
            const query = {
                iUserId: ObjectId(input.iUserId),
                iMatchId: ObjectId(input.iMatchId),
                iMatchLeagueId: ObjectId(input.iMatchLeagueId),
                iUserTeamId: ObjectId(input.iUserTeamId),
            };
            const result = await UserLeague.find(query)
                .skip(input.nOffset * input.nLimit)
                .limit(input.nLimit);
            return result;
        },
        getUserLeague: async (_, input, { dataSources }) => {
            // const result = await dataSources.userLeagueApi.getUserLeague(input);
            const query = {
                _id: ObjectId(input._id),
            };
            const result = await UserLeague.find(query);
            return result;
        },
        // getUserLeagueByIds: async (_, input, { dataSources }) => {
        //     const result = await dataSources.userLeagueApi.getUserLeagueByIds(input.id);
        //     return result;
        // },
        // getUserLeagueByFieldName: async (_, { input }, {}) => {
        //     const result = await UserLeague.find({ eCategory: input.value })
        //         .skip(input.nOffset * input.nLimit)
        //         .limit(input.nLimit);
        //     return result;
        // },
    },
};

module.exports = resolvers;
