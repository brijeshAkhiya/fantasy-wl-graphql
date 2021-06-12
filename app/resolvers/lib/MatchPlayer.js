/* eslint-disable no-empty-pattern */
const { MatchPlayer } = require('../../models');

const resolvers = {
    Query: {
        getMatchPlayers: async (_, { input }, {}) => {
            const result = await MatchPlayer.find({})
                .skip(input.nOffset * input.nLimit)
                .limit(input.nLimit);
            return result;
        },
        getMatchPlayer: async (_, input, { dataSources }) => {
            const result = await dataSources.matchPlayerApi.getMatchPlayer(input.id);
            return result;
        },
        getMatchPlayerByIds: async (_, input, { dataSources }) => {
            const result = await dataSources.matchPlayerApi.getMatchPlayerByIds(input.id);
            return result;
        },
        getMatchPlayerByFieldName: async (_, { input }, {}) => {
            console.log(input);
            const result = await MatchPlayer.find({ sTeamName: input.value })
                .skip(input.nOffset * input.nLimit)
                .limit(input.nLimit);
            return result;
        },
    },
};

module.exports = resolvers;
