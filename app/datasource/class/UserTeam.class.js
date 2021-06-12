const { MongoDataSource } = require('apollo-datasource-mongodb');

class UserTeamDS extends MongoDataSource {
    getUserTeam(id) {
        const result = this.findOneById(id);
        return result;
    }

    async getUserTeamByIds(iMatchIds) {
        const result = await this.findManyByIds(iMatchIds);
        return result;
    }
}

module.exports = UserTeamDS;
