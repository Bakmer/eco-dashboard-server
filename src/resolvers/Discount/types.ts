import { InputType, Field, ObjectType } from "type-graphql";
import { Length } from "class-validator";
import messages from "../../constants/messages";
import { ApiResponse } from "../sharedTypes";
import { Discount } from "../../entities/Discount";

const { STORE_NAME_LENGTH_ERROR } = messages;

@InputType()
export class CreateDiscountField {
  @Field()
  @Length(3, 20, {
    message: STORE_NAME_LENGTH_ERROR,
  })
  percentage: number;
}

@ObjectType()
export class DiscountResponse extends ApiResponse {
  @Field(() => Discount, { nullable: true })
  data?: Discount;
}

@ObjectType()
export class ListDiscountResponse extends ApiResponse {
  @Field(() => [Discount], { nullable: true })
  data?: Discount[];
}
