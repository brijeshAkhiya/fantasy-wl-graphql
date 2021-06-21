const { gql } = require('apollo-server');
require('graphql-import-node/register');
const match = require('./queries/Match.graphql');
const matchLeague = require('./queries/MatchLeague.graphql');
const matchPlayer = require('./queries/MatchPlayer.graphql');
const userLeague = require('./queries/UserLeague.graphql');
const userTeam = require('./queries/UserTeam.graphql');
const user = require('./mutations/User.graphql');
const subscriptions = require('./subscriptions/ApiTrigger.graphql');

const typeDefs = gql`
    type Query {
        _dummy: String
    }
    type Mutation {
        _dummy: String
    }
    type Message {
        _dummy: String
    }
    ${subscriptions}
    ${match}
    ${matchLeague}
    ${matchPlayer}
    ${userLeague}
    ${userTeam}
    ${user}
`;

module.exports = typeDefs;
