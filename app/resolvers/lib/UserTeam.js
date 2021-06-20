/* eslint-disable no-empty-pattern */
const { ObjectId } = require('mongoose').Types;
const { UserTeam } = require('../../models');

const resolvers = {
    Query: {
        getUserteams: async (_, { input }, {}) => {
            const query = {
                iUserId: ObjectId(input.iUserId),
                iMatchId: ObjectId(input.iMatchId),
            };
            const result = await UserTeam.find(query)
                .skip(input.nOffset * input.nLimit)
                .limit(input.nLimit);
            return result;
        },
        getUserTeam: async (_, input, { dataSources }) => {
            // const result = await dataSources.userTeamApi.getUserTeam(input);
            const result = await UserTeam.find({ _id: ObjectId(input._id) });
            return result;
        },
        // getUserTeamByIds: async (_, input, { dataSources }) => {
        //     const result = await dataSources.userTeamApi.getUserTeamByIds(input.id);
        //     return result;
        // },
        // getUserTeamByFieldName: async (_, { input }, {}) => {
        //     const result = await UserTeam.find({ eCategory: input.value })
        //         .skip(input.nOffset * input.nLimit)
        //         .limit(input.nLimit);
        //     return result;
        // },
    },
};

module.exports = resolvers;
