const { MongoDataSource } = require('apollo-datasource-mongodb');

class MatchTeamDS extends MongoDataSource {
    getMatchTeam(id) {
        const result = this.findOneById(id);
        return result;
    }

    async getMatchTeamByIds(iMatchIds) {
        const result = await this.findManyByIds(iMatchIds);
        return result;
    }
}

module.exports = MatchTeamDS;
