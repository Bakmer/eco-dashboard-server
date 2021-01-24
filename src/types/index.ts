import { GraphQLError } from "graphql";

export interface CustomError extends GraphQLError {
  errors?: { field: any; message: unknown }[];
}
