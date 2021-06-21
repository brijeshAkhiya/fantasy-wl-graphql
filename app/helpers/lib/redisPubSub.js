// const { RedisPubSub } = require('graphql-redis-subscriptions');
// const Redis = require('ioredis');

// const options = {
//     host: '127.0.0.1',
//     port: 6379,
//     retryStrategy: (times) =>
//         // reconnect after
//         Math.min(times * 50, 2000),
// };

// const pubsub = new RedisPubSub({
//     publisher: new Redis(options),
//     subscriber: new Redis(options),
// });

const { PubSub } = require('apollo-server-express');

const pubsub = new PubSub();

module.exports = pubsub;
