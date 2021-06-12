const match = require('./lib/Match');
const matchLeague = require('./lib/MatchLeague');
const matchPlayer = require('./lib/MatchPlayer');

const resolvers = [match, matchLeague, matchPlayer];

module.exports = resolvers;
