import { InputType, Field, ObjectType } from "type-graphql";
import { Length } from "class-validator";
import messages from "../../constants/messages";
import { ApiResponse } from "../sharedTypes";
import { Stores as Store } from "../../entities/Store";

const { STORE_NAME_LENGTH_ERROR } = messages;

@InputType()
export class CreateStoreFields {
  @Field()
  @Length(3, 20, {
    message: STORE_NAME_LENGTH_ERROR,
  })
  name: string;
}

@ObjectType()
export class StoreResponse extends ApiResponse {
  @Field(() => Store, { nullable: true })
  data?: Store;
}

@ObjectType()
export class ListStoresResponse extends ApiResponse {
  @Field(() => [Store], { nullable: true })
  data?: Store[];
}
