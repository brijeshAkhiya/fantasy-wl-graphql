const { MongoDataSource } = require('apollo-datasource-mongodb');
const { ObjectId } = require('mongoose').Types;

class MatchPlayerDS extends MongoDataSource {
    getMatchPlayer(input) {
        const result = this.findByFields({ iMatchId: ObjectId(input.iMatchId) });
        return result.splice(input.nOffset * input.nLimit, input.nLimit);
    }

    async getMatchPlayerByIds(iMatchIds) {
        const result = await this.findManyByIds(iMatchIds);
        return result;
    }
}

module.exports = MatchPlayerDS;
