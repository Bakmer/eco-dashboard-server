import { InputType, Field, ObjectType } from "type-graphql";
import { Length } from "class-validator";
import messages from "../../constants/messages";
import { ApiResponse } from "../sharedTypes";
import { Roles as Role } from "../../entities/Role";

const { STORE_NAME_LENGTH_ERROR } = messages;

@InputType()
export class CreateRoleField {
  @Field()
  @Length(3, 20, {
    message: STORE_NAME_LENGTH_ERROR,
  })
  name: string;
}

@ObjectType()
export class RoleResponse extends ApiResponse {
  @Field(() => Role, { nullable: true })
  data?: Role;
}
