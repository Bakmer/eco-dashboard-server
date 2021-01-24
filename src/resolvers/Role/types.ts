import { InputType, Field } from "type-graphql";
import { Length } from "class-validator";
import messages from "../../constants/messages";

const { STORE_NAME_LENGTH_ERROR } = messages;

@InputType()
export class CreateRolField {
  @Field()
  @Length(3, 20, {
    message: STORE_NAME_LENGTH_ERROR,
  })
  name: string;
}
