import { buildSchema } from "type-graphql";

import { UserResolver } from "../resolvers/User";
import { HelloResolver } from "../resolvers/Hello";

export const createSchema = () =>
  buildSchema({
    resolvers: [UserResolver, HelloResolver],
    // authChecker: ({ context: { req } }) => {
    //   return !!req.session.userId;
    // },
  });
