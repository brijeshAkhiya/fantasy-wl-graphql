const { shield } = require('graphql-shield');
const permissions = require('./lib/permissions');

const permissionsShield = shield({
    Query: {
        getMatches: permissions.isAuthenticated,
        getMatch: permissions.isAuthenticated,
        getMatchLeagues: permissions.isAuthenticated,
        getMatchLeague: permissions.isAuthenticated,
        getMatchPlayers: permissions.isAuthenticated,
        getMatchPlayer: permissions.isAuthenticated,
        getUserLeagues: permissions.isAuthenticated,
        getUserLeague: permissions.isAuthenticated,
        getUserTeams: permissions.isAuthenticated,
        getUserTeam: permissions.isAuthenticated,
    },
});

module.exports = permissionsShield;
