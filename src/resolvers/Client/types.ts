import { InputType, Field, ObjectType } from "type-graphql";
import { Length, Min } from "class-validator";
import messages from "../../constants/messages";
import { ApiResponse, ApiPaginatedResponse } from "../sharedTypes";
import { Client } from "../../entities/Client";

const {
  NAME_LENGTH_ERROR,
  LAST_NAME_LENGTH_ERROR,
  STORE_REQUIRED,
  STATES_REQUIRED,
  GENERIC_ERROR,
  DISCOUNT_REQUIRED,
  EMAIL_LENGHT_ERROR,
} = messages;

@ObjectType()
export class ClientResponse extends ApiResponse {
  @Field(() => Client, { nullable: true })
  data?: Client;
}

@InputType()
export class CreateFields {
  @Field()
  @Length(3, 50, { message: NAME_LENGTH_ERROR })
  name: string;

  @Field()
  @Length(3, 50, { message: LAST_NAME_LENGTH_ERROR })
  last_name: string;

  @Field()
  @Length(3, 50, { message: EMAIL_LENGHT_ERROR })
  email: string;

  @Field()
  memo: string;

  @Field({ nullable: true })
  @Min(1, { message: STORE_REQUIRED })
  store_id: number;

  @Field()
  @Min(1, { message: STATES_REQUIRED })
  state_id: number;

  @Field()
  @Min(1, { message: DISCOUNT_REQUIRED })
  discount_id: number;

  @Field({ nullable: true })
  user_id: number;
}

@InputType()
export class UpdateFields {
  @Field()
  @Min(1, { message: STORE_REQUIRED })
  id: number;
  @Field()
  client: CreateFields;
}

@InputType()
export class GetUserFields {
  @Field()
  @Min(1, { message: GENERIC_ERROR })
  id: number;
}

@ObjectType()
export class PaginatedClientsResponse extends ApiPaginatedResponse {
  @Field(() => [Client], { nullable: true })
  data?: Client[];
}

@InputType()
export class DeleteClientFields {
  @Field()
  id: number;
}
