const { MongoDataSource } = require('apollo-datasource-mongodb');

class MatchLeagueDS extends MongoDataSource {
    getMatchLeague(id) {
        const result = this.findOneById(id);
        return result;
    }

    async getMatchLeaguesByIds(iMatchIds) {
        const result = await this.findManyByIds(iMatchIds);
        return result;
    }
}

module.exports = MatchLeagueDS;
