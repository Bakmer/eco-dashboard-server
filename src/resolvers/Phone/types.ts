import { InputType, Field, ObjectType } from "type-graphql";
// import { Length } from "class-validator";
import messages from "../../constants/messages";
import { ApiResponse } from "../sharedTypes";
import { Phone } from "../../entities/Phone";

const {} = messages;

@InputType()
export class CreatePhoneFields {
  @Field()
  name: string;
  @Field()
  area_code: number;
  @Field()
  phone: number;
  @Field()
  client_id: number;
}

@ObjectType()
export class PhoneResponse extends ApiResponse {
  @Field(() => Phone, { nullable: true })
  data?: Phone;
}

// @ObjectType()
// export class ListDiscountResponse extends ApiResponse {
//   @Field(() => [Discount], { nullable: true })
//   data?: Discount[];
// }
