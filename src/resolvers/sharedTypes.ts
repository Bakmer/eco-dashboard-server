import { Field, InputType, ObjectType } from "type-graphql";
import { GraphQLJSONObject } from "graphql-type-json";
import { Min } from "class-validator";
import messages from "../constants/messages";

const { PAGINATION_DATA_ERROR, CHANGE_STATE_ERROR } = messages;

@ObjectType()
export class ApiResponse {
  @Field(() => GraphQLJSONObject, { nullable: true })
  data?: object;

  @Field({ nullable: true })
  message?: string;
}

export type OrderType = "ASC" | "DESC";

@ObjectType()
class PaginationFilters {
  @Field({ nullable: true })
  search?: string;

  @Field({ nullable: true })
  page?: number;

  @Field({ nullable: true })
  per_page?: number;

  @Field({ nullable: true })
  count?: number;

  @Field({ nullable: true })
  order_type?: OrderType;

  @Field({ nullable: true })
  order_by?: string;
}

@ObjectType()
export class ApiPaginatedResponse extends ApiResponse {
  @Field({ nullable: true })
  filters?: PaginationFilters;
}

@InputType()
export class PaginationFields {
  @Field({ nullable: true })
  @Min(1, { message: PAGINATION_DATA_ERROR })
  per_page: number;

  @Field({ nullable: true })
  @Min(0, { message: PAGINATION_DATA_ERROR })
  page: number;

  @Field({ nullable: true })
  order_by: string;

  @Field({ nullable: true })
  order_type: OrderType;

  @Field({ nullable: true })
  search: string;
}

@InputType()
export class ChangeStateFields {
  @Field()
  @Min(1, { message: CHANGE_STATE_ERROR })
  id: number;
}

@ObjectType()
class StateFields {
  @Field()
  id: number;

  @Field()
  name: string;
}

@ObjectType()
export class ChangeStateResponse extends ApiResponse {
  @Field(() => StateFields, { nullable: true })
  data?: StateFields;
}
