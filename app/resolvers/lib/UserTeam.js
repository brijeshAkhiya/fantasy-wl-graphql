/* eslint-disable no-empty-pattern */
const { ObjectId } = require('mongoose').Types;
const { redisPubsub } = require('../../helpers');
const { UserTeam } = require('../../models');

const resolvers = {
    Subscription: {
        getApiTrigger: {
            subscribe: () => redisPubsub.asyncIterator(['apiTrigger']),
        },
    },
    Query: {
        getUserTeams: async (_, { input }, context) => {
            const query = {
                iUserId: ObjectId(context.user._id),
                iMatchId: ObjectId(input.iMatchId),
            };
            const result = await UserTeam.find(query)
                .skip(input.nOffset * input.nLimit)
                .limit(input.nLimit);
            const payload = {
                sApiName: 'getUserTeams',
                calledBy: context.user.sEmail,
            };
            redisPubsub.publish('apiTrigger', { getApiTrigger: payload });
            return result;
        },
        getUserTeam: async (_, input, context) => {
            // const result = await dataSources.userTeamApi.getUserTeam(input);
            const result = await UserTeam.find({ _id: ObjectId(input._id) });
            const payload = {
                sApiName: 'getUserTeam',
                calledBy: context.user.sEmail,
            };
            redisPubsub.publish('apiTrigger', { getApiTrigger: payload });
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
