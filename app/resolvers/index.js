const match = require('./lib/Match');
const matchLeague = require('./lib/MatchLeague');
const matchPlayer = require('./lib/MatchPlayer');
const userLeague = require('./lib/UserLeague');
const userTeam = require('./lib/UserTeam');
const user = require('./lib/User');

const resolvers = [match, matchLeague, matchPlayer, user, userLeague, userTeam];

module.exports = resolvers;
