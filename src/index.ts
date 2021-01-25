import "reflect-metadata";
import "dotenv-safe/config";
import { ApolloServer } from "apollo-server-express";
import express from "express";
import session from "express-session";
import { createConnection } from "typeorm";
import cors from "cors";
import { __prod__, COOKIE_NAME } from "./constants";

import Redis from "ioredis";
import connectRedis from "connect-redis";
import { createSchema } from "./utils/createSchema";
import {
  fieldExtensionsEstimator,
  getComplexity,
  simpleEstimator,
} from "graphql-query-complexity";

const main = async () => {
  await createConnection();

  const app = express();

  const RedisStore = connectRedis(session);
  const redis = new Redis(process.env.REDIS_URL);

  app.use(
    session({
      name: COOKIE_NAME,
      store: new RedisStore({
        client: redis,
        disableTouch: true,
      }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
        httpOnly: true,
        sameSite: "lax", // csrf
        secure: __prod__, // cookie only works in https
        domain: __prod__ ? ".codeponder.com" : undefined,
      },
      saveUninitialized: false,
      secret: process.env.SESSION_SECRET!,
      resave: false,
    })
  );

  app.use(
    cors({
      origin: process.env.CORS_ORIGIN,
      credentials: true,
    })
  );

  const schema = await createSchema();

  const apolloServer = new ApolloServer({
    schema,
    context: ({ req, res }) => ({
      req,
      res,
      redis,
      //   userLoader: createUserLoader(),
      //   updootLoader: createUpdootLoader(),
    }),
    plugins: [
      {
        requestDidStart: () => ({
          didResolveOperation({ request, document }) {
            /**
             * This provides GraphQL query analysis to be able to react on complex queries to your GraphQL server.
             * This can be used to protect your GraphQL servers against resource exhaustion and DoS attacks.
             * More documentation can be found at https://github.com/ivome/graphql-query-complexity.
             */
            const complexity = getComplexity({
              // Our built schema
              schema,
              // To calculate query complexity properly,
              // we have to check only the requested operation
              // not the whole document that may contains multiple operations
              operationName: request.operationName,
              // The GraphQL query document
              query: document,
              // The variables for our GraphQL query
              variables: request.variables,
              // Add any number of estimators. The estimators are invoked in order, the first
              // numeric value that is being returned by an estimator is used as the field complexity.
              // If no estimator returns a value, an exception is raised.
              estimators: [
                // Using fieldExtensionsEstimator is mandatory to make it work with type-graphql.
                fieldExtensionsEstimator(),
                // Add more estimators here...
                // This will assign each field a complexity of 1
                // if no other estimator returned a value.
                simpleEstimator({ defaultComplexity: 1 }),
              ],
            });
            // Here we can react to the calculated complexity,
            // like compare it with max and throw error when the threshold is reached.
            if (complexity > 20) {
              throw new Error(
                `Sorry, too complicated query! ${complexity} is over 20 that is the max allowed complexity.`
              );
            }
            // And here we can e.g. subtract the complexity point from hourly API calls limit.
            console.log("Used query complexity points:", complexity);
          },
        }),
      },
    ],
  });

  apolloServer.applyMiddleware({
    app,
    cors: false,
  });

  app.listen(parseInt(process.env.PORT!), () => {
    console.log("server started on localhost:4000");
  });
};

main().catch((err) => {
  console.error(err);
});
