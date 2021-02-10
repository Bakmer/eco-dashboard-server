import { InputType, Field, ObjectType } from "type-graphql";
import { Length, Min } from "class-validator";
import messages from "../../constants/messages";
import { ApiResponse, ApiPaginatedResponse } from "../sharedTypes";
import { Users as User } from "../../entities/User";

const {
  USERNAME_LENGTH_ERROR,
  PASSWORD_LENGTH_ERROR,
  NAME_LENGTH_ERROR,
  LAST_NAME_LENGTH_ERROR,
  ROLE_REQUIRED,
  STORE_REQUIRED,
  CHANGE_USER_STATUS_ERROR,
} = messages;

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
}

@InputType()
export class ChangeUserStatusFields {
  @Field()
  @Min(1, { message: CHANGE_USER_STATUS_ERROR })
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
class StatusFields {
  @Field()
  id: number;

  @Field()
  name: string;
}

@ObjectType()
export class ChangeStatusResponse extends ApiResponse {
  @Field(() => StatusFields, { nullable: true })
  data?: StatusFields;
}
