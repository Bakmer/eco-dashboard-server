import { buildSchema } from "type-graphql";

import { UserResolver } from "../resolvers/User";
import { HelloResolver } from "../resolvers/Hello";
import { StoreResolver } from "../resolvers/Store";

export const createSchema = () =>
  buildSchema({
    resolvers: [UserResolver, HelloResolver, StoreResolver],
    authChecker: ({ context: { req } }, roles) => {
      console.log(req.session);
      console.log(roles);
      return false;
    },
  });
