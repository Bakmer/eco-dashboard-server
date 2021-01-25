import { Field, ObjectType } from "type-graphql";
import { GraphQLJSONObject } from "graphql-type-json";

@ObjectType()
export class ApiResponse {
  @Field(() => GraphQLJSONObject, { nullable: true })
  data?: object;

  @Field({ nullable: true })
  message?: string;
}
