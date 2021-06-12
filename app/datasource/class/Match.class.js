const { MongoDataSource } = require('apollo-datasource-mongodb');

class MatchDS extends MongoDataSource {
    async getMatch(iMatchId) {
        const match = await this.findOneById(iMatchId);
        return match;
    }

    async getMatchesByIds(iMatchIds) {
        const match = await this.findManyByIds(iMatchIds);
        return match;
    }

    async getMatchByField(oInput) {
        const match = await this.findByFields({ eCategory: oInput.value });
        return match;
    }
}

module.exports = MatchDS;
