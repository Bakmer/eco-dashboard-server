import { Field, ObjectType } from "type-graphql";
import { GraphQLJSONObject } from "graphql-type-json";

@ObjectType()
export class FieldError {
  @Field()
  field?: string;
  @Field()
  message?: string;
}

@ObjectType()
export class ApiResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => GraphQLJSONObject, { nullable: true })
  data?: object;

  @Field({ nullable: true })
  message?: string;
}
