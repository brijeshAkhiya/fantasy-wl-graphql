const { gql } = require('apollo-server');
require('graphql-import-node/register');
const match = require('./queries/Match.graphql');
const matchLeague = require('./queries/MatchLeague.graphql');
const matchPlayer = require('./queries/MatchPlayer.graphql');
const matchTeam = require('./queries/MatchTeam.graphql');
const userLeague = require('./queries/UserLeague.graphql');
const userTeam = require('./queries/UserTeam.graphql');

const typeDefs = gql`
    type Query {
        _dummy: String
    }
    type Message {
        _dummy: String
    }
    ${match}
    ${matchLeague}
    ${matchPlayer}
    ${matchTeam}
    ${userLeague}
    ${userTeam}
`;

module.exports = typeDefs;
