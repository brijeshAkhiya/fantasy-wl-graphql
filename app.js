const mongoose = require('mongoose');
const { ApolloServer, makeExecutableSchema } = require('apollo-server-express');

const { applyMiddleware } = require('graphql-middleware');
const express = require('express');
const http = require('http');
const typeDefs = require('./app/typedefs');
const resolvers = require('./app/resolvers');
const permissions = require('./app/permissions');
const { Match, MatchLeague, MatchPlayer, MatchTeam, UserLeague, UserTeam } = require('./app/models');
const { MatchDS, MatchLeagueDS, MatchPlayerDS, MatchTeamDS, UserLeagueDS, UserTeamDS } = require('./app/datasource');

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

const subscriptions = {
    pathL: '/subscriptions',
    onConnect: (connectionParams, webSocket, context) => {
        console.log('Client connected');
    },
    onDisconnect: (webSocket, context) => {
        console.log('Client disconnected');
    },
};

const server = new ApolloServer({
    schema: applyMiddleware(makeExecutableSchema({ typeDefs, resolvers }), permissions),
    subscriptions,
    introspection: true,
    playground: true,
    context: ({ req }) => {
        if (req) {
            return req.headers;
        }
    },
    dataSources: () => ({
        matchApi: new MatchDS(Match),
        matchLeagueApi: new MatchLeagueDS(MatchLeague),
        matchPlayerApi: new MatchPlayerDS(MatchPlayer),
        matchTeamApi: new MatchTeamDS(MatchTeam),
        userLeagueApi: new UserLeagueDS(UserLeague),
        userTeamApi: new UserTeamDS(UserTeam),
    }),
});

server.applyMiddleware({ app });
const httpServer = http.createServer(app);

server.installSubscriptionHandlers(httpServer);

httpServer.listen(process.env.PORT || 4000, () => {
    console.log(`🚀  Server ready at http://localhost:${process.env.PORT || 4000} enjoy`, server.graphqlPath);
    console.log(`🚀  Socket ready at ws://localhost:${process.env.PORT || 4000} enjoy`, server.subscriptionsPath);
});

module.exports = app;
