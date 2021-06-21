const jwt = require('jsonwebtoken');

const operations = {};

operations.encodeToken = function (body, expTime) {
    try {
        return expTime ? jwt.sign(body, process.env.JWT_SECRET, expTime) : jwt.sign(body, process.env.JWT_SECRET);
    } catch (error) {
        return undefined;
    }
};

operations.verifyToken = function (token) {
    try {
        return jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
            return err ? err.message : decoded; // return true if token expired
        });
    } catch (error) {
        return error ? error.message : error;
    }
};

operations.decodeToken = function (token) {
    try {
        return jwt.decode(token, process.env.JWT_SECRET);
    } catch (error) {
        return undefined;
    }
};

module.exports = operations;
