const { MongoDataSource } = require('apollo-datasource-mongodb');
const { ObjectId } = require('mongoose').Types;

class MatchLeagueDS extends MongoDataSource {
    async getMatchLeague(input) {
        const result = await this.findByFields({ iMatchId: ObjectId(input.iMatchId) });
        if (result) {
            return result.splice(input.nOffset * input.nLimit, input.nLimit);
        }
        return null;
    }

    async getMatchLeaguesByIds(iMatchIds) {
        const result = await this.findManyByIds(iMatchIds);
        return result;
    }
}

module.exports = MatchLeagueDS;
