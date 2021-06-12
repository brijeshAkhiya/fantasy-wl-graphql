const { MongoDataSource } = require('apollo-datasource-mongodb');

class MatchPlayerDS extends MongoDataSource {
    getMatchPlayer(id) {
        const result = this.findOneById(id);
        return result;
    }

    async getMatchPlayerByIds(iMatchIds) {
        const result = await this.findManyByIds(iMatchIds);
        return result;
    }
}

module.exports = MatchPlayerDS;
