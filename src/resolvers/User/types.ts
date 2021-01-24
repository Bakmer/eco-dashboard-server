import { InputType, Field } from "type-graphql";
import { Length } from "class-validator";
import messages from "../../constants/messages";

const { USERNAME_LENGTH_ERROR, PASSWORD_LENGTH_ERROR } = messages;

@InputType()
export class UsernamePasswordInput {
  @Field()
  username: string;
  @Field()
  password: string;
}

@InputType()
export class RegisterFields {
  @Field()
  @Length(3, 50, { message: USERNAME_LENGTH_ERROR })
  username: string;
  @Field()
  @Length(3, 50, { message: PASSWORD_LENGTH_ERROR })
  password: string;
  @Field()
  storeId: number;
  @Field()
  roleId: number;
}
