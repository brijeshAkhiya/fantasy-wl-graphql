/* eslint-disable no-empty-pattern */
const { ObjectId } = require('mongoose').Types;
const { MatchTeam } = require('../../models');

const resolvers = {
    Query: {
        getMatchTeams: async (_, { input }, {}) => {
            const result = await MatchTeam.find({})
                .skip(input.nOffset * input.nLimit)
                .limit(input.nLimit);
            return result;
        },
        getMatchTeam: async (_, { input }, { dataSources }) => {
            // const result = await dataSources.matchTeamApi.getMatchTeam(input);
            const result = await MatchTeam.find({ iMatchId: ObjectId(input.iMatchId) })
                .skip(input.nOffset * input.nLimit)
                .limit(input.nLimit);
            return result;
        },
        getMatchTeamByIds: async (_, input, { dataSources }) => {
            const result = await dataSources.matchTeamApi.getMatchTeamByIds(input.id);
            return result;
        },
        getMatchTeamByFieldName: async (_, { input }, {}) => {
            const result = await MatchTeam.find({ eCategory: input.value })
                .skip(input.nOffset * input.nLimit)
                .limit(input.nLimit);
            return result;
        },
    },
};

module.exports = resolvers;
