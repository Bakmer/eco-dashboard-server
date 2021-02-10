import { InputType, Field, ObjectType } from "type-graphql";
import { Length } from "class-validator";
import messages from "../../constants/messages";
import { ApiResponse } from "../sharedTypes";
import { Status } from "../../entities/Status";

const { STATUS_LENGTH_ERROR } = messages;

@InputType()
export class CreateStatusFields {
  @Field()
  @Length(3, 20, {
    message: STATUS_LENGTH_ERROR,
  })
  name: string;
}

@ObjectType()
export class StatusResponse extends ApiResponse {
  @Field(() => Status, { nullable: true })
  data?: Status;
}

@ObjectType()
export class ListStatusResponse extends ApiResponse {
  @Field(() => [Status], { nullable: true })
  data?: Status[];
}
