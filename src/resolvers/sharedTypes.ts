import { Field, InputType, ObjectType } from "type-graphql";
import { GraphQLJSONObject } from "graphql-type-json";
import { Min } from "class-validator";
import messages from "../constants/messages";

const { PAGINATION_DATA_ERROR } = messages;

@ObjectType()
export class ApiResponse {
  @Field(() => GraphQLJSONObject, { nullable: true })
  data?: object;

  @Field({ nullable: true })
  message?: string;
}

@ObjectType()
export class ApiPaginatedResponse extends ApiResponse {
  @Field({ nullable: true })
  page?: number;

  @Field({ nullable: true })
  per_page?: number;

  @Field({ nullable: true })
  count?: number;
}

@InputType()
export class PaginationFields {
  @Field({ nullable: true })
  @Min(1, { message: PAGINATION_DATA_ERROR })
  per_page: number;

  @Field({ nullable: true })
  @Min(1, { message: PAGINATION_DATA_ERROR })
  page: number;
}
