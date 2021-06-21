/* eslint-disable no-empty-pattern */
const { ObjectId } = require('mongoose').Types;
const { redisPubsub } = require('../../helpers');
const { UserLeague } = require('../../models');

const resolvers = {
    Query: {
        getUserLeagues: async (_, { input }, context) => {
            const query = {
                iUserId: ObjectId(context.user._id),
                iMatchId: ObjectId(input.iMatchId),
                iMatchLeagueId: ObjectId(input.iMatchLeagueId),
                iUserTeamId: ObjectId(input.iUserTeamId),
            };
            const result = await UserLeague.find(query)
                .skip(input.nOffset * input.nLimit)
                .limit(input.nLimit);
            const payload = {
                sApiName: 'getUserLeagues',
                calledBy: context.user.sEmail,
            };
            redisPubsub.publish('apiTrigger', { getApiTrigger: payload });
            return result;
        },
        getUserLeague: async (_, input, context) => {
            // const result = await dataSources.userLeagueApi.getUserLeague(input);
            const query = {
                _id: ObjectId(input._id),
            };
            const payload = {
                sApiName: 'getUserLeague',
                calledBy: context.user.sEmail,
            };
            redisPubsub.publish('apiTrigger', { getApiTrigger: payload });
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
