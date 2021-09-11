import { InputType, Field, ObjectType } from "type-graphql";
import { Length } from "class-validator";
import messages from "../../constants/messages";
import { ApiResponse } from "../sharedTypes";
import { State } from "../../entities/State";

const { STATES_LENGTH_ERROR } = messages;

@InputType()
export class CreateStateFields {
  @Field()
  @Length(3, 20, {
    message: STATES_LENGTH_ERROR,
  })
  name: string;
}

@ObjectType()
export class StateResponse extends ApiResponse {
  @Field(() => State, { nullable: true })
  data?: State;
}

@ObjectType()
export class ListStatesResponse extends ApiResponse {
  @Field(() => [State], { nullable: true })
  data?: State[];
}
