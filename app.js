const mongoose = require('mongoose');
const { ApolloServer, makeExecutableSchema } = require('apollo-server-express');
const { applyMiddleware } = require('graphql-middleware');
const express = require('express');
const typeDefs = require('./app/typedefs');
const resolvers = require('./app/resolvers');
const { Match } = require('./app/models');
const { MatchDS } = require('./app/datasource');

const app = express();

mongoose
    .connect(process.env.DB_URL, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
    })
    .then(() => {
        console.log('Database Connected');
    })
    .catch((error) => {
        console.log('Connection Error', error);
    });

const server = new ApolloServer({
    schema: applyMiddleware(makeExecutableSchema({ typeDefs, resolvers })),
    context: ({ req }) => req.headers,
    dataSources: () => ({
        matchApi: new MatchDS(Match),
    }),
});

server.applyMiddleware({ app });

app.listen(process.env.PORT || 4000, () => {
    console.log(`🚀  Server ready at http://localhost:${process.env.PORT || 4000} enjoy`);
});

module.exports = app;
