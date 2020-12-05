import { InputType, Field, ObjectType } from "type-graphql";

@InputType()
export class UsernamePasswordInput {
  @Field()
  username: string;
  @Field()
  password: string;
  @Field()
  storeId: number;
}

@ObjectType()
export class FieldError {
  @Field()
  field: string;
  @Field()
  message: string;
}

@ObjectType()
export class ApiResponse {
  @Field(() => [FieldError], { nullable: true })
  errors: FieldError[] | null;

  @Field(() => Object)
  data?: object;

  @Field({ nullable: true })
  message?: string;
}
