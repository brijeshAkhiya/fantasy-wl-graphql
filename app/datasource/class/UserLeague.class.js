const { MongoDataSource } = require('apollo-datasource-mongodb');

class UserLeagueDS extends MongoDataSource {
    getUserLeague(id) {
        const result = this.findOneById(id);
        return result;
    }

    async getUserLeagueByIds(iMatchIds) {
        const result = await this.findManyByIds(iMatchIds);
        return result;
    }
}

module.exports = UserLeagueDS;
