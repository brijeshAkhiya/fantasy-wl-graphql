const { MongoDataSource } = require('apollo-datasource-mongodb');

class MatchDS extends MongoDataSource {
    async getMatch(iMatchId) {
        const match = await this.findOneById(iMatchId);
        return match;
    }
}

module.exports = MatchDS;
