const crypto = require('crypto');

const operations = {};

operations.encryptPassword = function (password) {
    return crypto.createHmac('sha256', process.env.JWT_SECRET).update(password).digest('hex');
};

module.exports = operations;
