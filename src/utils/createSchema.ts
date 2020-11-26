import { buildSchema } from "type-graphql";

export const createSchema = () =>
  buildSchema({
    resolvers: [],
    authChecker: ({ context: { req } }) => {
      return !!req.session.userId;
    },
  });
