const { MongoDataSource } = require('apollo-datasource-mongodb');
const { ObjectId } = require('mongoose').Types;

class MatchTeamDS extends MongoDataSource {
    getMatchTeam(input) {
        const result = this.findByFields({ iMatchId: ObjectId(input.iMatchId) });
        return result.splice(input.nOffset * input.nLimit, input.nLimit);
    }

    async getMatchTeamByIds(iMatchIds) {
        const result = await this.findManyByIds(iMatchIds);
        return result;
    }
}

module.exports = MatchTeamDS;
