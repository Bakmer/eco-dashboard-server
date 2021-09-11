import { InputType, Field, ObjectType } from "type-graphql";
import { Min } from "class-validator";
import messages from "../../constants/messages";
import { ApiResponse } from "../sharedTypes";
import { Phone } from "../../entities/Phone";

const { CLIENT_REQUIRED, PHONE_REQUIRED } = messages;

@InputType()
export class CreatePhoneFields {
  @Field()
  name: string;
  @Field()
  area_code: string;
  @Field()
  phone: string;
  @Field()
  @Min(1, { message: CLIENT_REQUIRED })
  client_id: number;
}

@ObjectType()
export class PhoneResponse extends ApiResponse {
  @Field(() => Phone, { nullable: true })
  data?: Phone;
}

@InputType()
export class DeletePhoneFields {
  @Field()
  id: number;
}

@InputType()
export class UpdatePhoneFields {
  @Field()
  @Min(1, { message: PHONE_REQUIRED })
  id: number;
  @Field()
  phone: CreatePhoneFields;
}

// @ObjectType()
// export class ListDiscountResponse extends ApiResponse {
//   @Field(() => [Discount], { nullable: true })
//   data?: Discount[];
// }
