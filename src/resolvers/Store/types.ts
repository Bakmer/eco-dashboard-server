import { InputType, Field } from "type-graphql";
import { Length } from "class-validator";
import messages from "../../constants/messages";

const { ROLE_NAME_LENGTH_ERROR } = messages;

@InputType()
export class CreateStoreFields {
  @Field()
  @Length(3, 20, {
    message: ROLE_NAME_LENGTH_ERROR,
  })
  name: string;
}
