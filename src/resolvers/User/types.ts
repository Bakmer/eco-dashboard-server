import { InputType, Field, ObjectType } from "type-graphql";
import { Length, Min } from "class-validator";
import messages from "../../constants/messages";
import {
  ApiResponse,
  PaginationFields,
  ApiPaginatedResponse,
} from "../sharedTypes";
import { Users as User } from "../../entities/User";

const {
  USERNAME_LENGTH_ERROR,
  PASSWORD_LENGTH_ERROR,
  NAME_LENGTH_ERROR,
  LAST_NAME_LENGTH_ERROR,
  ROLE_REQUIRED,
  STORE_REQUIRED,
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
export class UsersPaginationFields extends PaginationFields {
  @Field({ nullable: true })
  field: string;

  @Field({ nullable: true })
  order_type: "ASC" | "DESC";

  @Field({ nullable: true })
  search: string;
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
