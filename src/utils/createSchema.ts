import { buildSchema } from "type-graphql";

import { UserResolver } from "../resolvers/User";
import { HelloResolver } from "../resolvers/Hello";
import { StoreResolver } from "../resolvers/Store";
import { RoleResolver } from "../resolvers/Role";
import { StateResolver } from "../resolvers/State";
import { ClientResolver } from "../resolvers/Client";

export const createSchema = () =>
  buildSchema({
    resolvers: [
      UserResolver,
      HelloResolver,
      StoreResolver,
      RoleResolver,
      StateResolver,
      ClientResolver,
    ],
    authChecker: ({ context: { req } }, roles) => {
      const user = req.session.user;
      if (roles.length === 0) {
        return user !== undefined;
      }
      if (!user) {
        return false;
      }
      for (let i = 0; i < roles.length; i++) {
        if (roles[i] === user.role_id) {
          return true;
        }
      }
      return false;
    },
  });
