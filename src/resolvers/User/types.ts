import { InputType, Field, ObjectType } from "type-graphql";
import { Length, Min } from "class-validator";
import messages from "../../constants/messages";
import { ApiResponse, ApiPaginatedResponse } from "../sharedTypes";
import { User } from "../../entities/User";

const {
  USERNAME_LENGTH_ERROR,
  PASSWORD_LENGTH_ERROR,
  NAME_LENGTH_ERROR,
  LAST_NAME_LENGTH_ERROR,
  ROLE_REQUIRED,
  STORE_REQUIRED,
  CHANGE_USER_STATE_ERROR,
} = messages;

@InputType()
export class UsernamePasswordInput {
  @Field()
  username: string;
  @Field()
  password: string;
}

@InputType()
export class CreateUserFields {
  @Field()
  @Length(3, 50, { message: NAME_LENGTH_ERROR })
  name: string;
  @Field()
  @Length(3, 50, { message: LAST_NAME_LENGTH_ERROR })
  last_name: string;
  @Field()
  @Length(3, 50, { message: USERNAME_LENGTH_ERROR })
  username: string;
  @Field()
  @Length(3, 50, { message: PASSWORD_LENGTH_ERROR })
  password: string;
  @Field()
  @Min(1, { message: STORE_REQUIRED })
  storeId: number;
  @Field()
  @Min(1, { message: ROLE_REQUIRED })
  roleId: number;
  @Field()
  @Min(1, { message: ROLE_REQUIRED })
  stateId: number;
}

@InputType()
export class ChangeUserStateFields {
  @Field()
  @Min(1, { message: CHANGE_USER_STATE_ERROR })
  id: number;
}

@ObjectType()
export class UserResponse extends ApiResponse {
  @Field(() => User, { nullable: true })
  data?: User;
}

@ObjectType()
export class PaginatedUsersResponse extends ApiPaginatedResponse {
  @Field(() => [User], { nullable: true })
  data?: User[];
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

@InputType()
export class UpdateUserFields {
  @Field({ nullable: true })
  id: number;
  @Field()
  user: CreateUserFields;
}
