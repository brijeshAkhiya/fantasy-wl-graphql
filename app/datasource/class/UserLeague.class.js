const { MongoDataSource } = require('apollo-datasource-mongodb');
const { ObjectId } = require('mongoose').Types;

class UserLeagueDS extends MongoDataSource {
    getUserLeague(input) {
        const result = this.findByFields({ iUserId: ObjectId(input.iUserId) });
        return result.splice(input.nOffset * input.nLimit, input.nLimit);
    }

    async getUserLeagueByIds(iMatchIds) {
        const result = await this.findManyByIds(iMatchIds);
        return result;
    }
}

module.exports = UserLeagueDS;
