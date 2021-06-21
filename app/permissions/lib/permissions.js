const { rule } = require('graphql-shield');
const { User } = require('../../models');
const { jwt } = require('../../helpers');

const permissions = {};

permissions.isAuthenticated = rule('User Authentication')(async (parent, args, context) => {
    try {
        if (!context.authorization) throw new Error('No Token Found');
        const decodedToken = jwt.verifyToken(context.authorization);
        if (!decodedToken || decodedToken === 'jwt expired') throw new Error('JWT expired, please login again');
        const query = {
            _id: decodedToken.iUserId,
            'aJwtTokens.sToken': context.authorization,
            eType: decodedToken.eType,
        };
        const result = await User.findOne(query).lean();
        if (!result) throw new Error('User not found');
        context.user = result;
        return true;
    } catch (error) {
        return error;
    }
});

module.exports = permissions;
