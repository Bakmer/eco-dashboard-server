import { buildSchema } from "type-graphql";

import { UserResolver } from "../resolvers/User";
import { HelloResolver } from "../resolvers/Hello";
import { StoreResolver } from "../resolvers/Store";
import { RoleResolver } from "../resolvers/Role";
import { StatusResolver } from "../resolvers/Status";

export const createSchema = () =>
  buildSchema({
    resolvers: [
      UserResolver,
      HelloResolver,
      StoreResolver,
      RoleResolver,
      StatusResolver,
    ],
    authChecker: ({ context: { req } }, roles) => {
      console.log(req.session.user);
      const user = req.session.user;
      if (roles.length === 0) {
        return user !== undefined;
      }
      if (!user) {
        return false;
      }
      for (let i = 0; i < roles.length; i++) {
        if (roles[i] === user.roleId) {
          return true;
        }
      }
      return false;
    },
  });
