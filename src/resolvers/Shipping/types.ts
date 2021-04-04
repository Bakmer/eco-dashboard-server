import { InputType, Field, ObjectType } from "type-graphql";
import { Min } from "class-validator";
import messages from "../../constants/messages";
import { ApiResponse } from "../sharedTypes";
import { Shipping } from "../../entities/Shipping";
import { GraphQLJSONObject } from "graphql-type-json";

const { CLIENT_REQUIRED, SHIPPING_REQUIRED, TRANSPORT_REQUIRED } = messages;

@InputType()
export class CreateShippingFields {
  @Field()
  name: string;
  @Field()
  street: string;
  @Field()
  street_number: number;
  @Field()
  memo: string;
  @Field()
  cuit: string;
  @Field()
  province_id: string; // Georef api uses string for id
  @Field()
  location_id: string; // Georef api uses string for id
  @Field()
  postal_code: string;
  @Field()
  @Min(1, { message: CLIENT_REQUIRED })
  client_id: number;
  @Field()
  @Min(1, { message: TRANSPORT_REQUIRED })
  transport_id: number;
}

@InputType()
export class CreateShipping {
  @Field()
  name: string;
  @Field()
  street: string;
  @Field()
  street_number: number;
  @Field()
  memo: string;
  @Field()
  cuit: string;
  @Field(() => GraphQLJSONObject, { nullable: true })
  province: object;
  @Field(() => GraphQLJSONObject, { nullable: true })
  location: object;
  @Field()
  postal_code: string;
  @Field()
  @Min(1, { message: CLIENT_REQUIRED })
  client_id: number;
  @Field()
  @Min(1, { message: TRANSPORT_REQUIRED })
  transport_id: number;
}

@ObjectType()
export class ShippingResponse extends ApiResponse {
  @Field(() => Shipping, { nullable: true })
  data?: Shipping;
}

@InputType()
export class DeleteShippingFields {
  @Field()
  id: number;
}

@InputType()
export class UpdateShippingFields {
  @Field()
  @Min(1, { message: SHIPPING_REQUIRED })
  id: number;
  @Field()
  shipping: CreateShippingFields;
}

// @ObjectType()
// export class ListDiscountResponse extends ApiResponse {
//   @Field(() => [Discount], { nullable: true })
//   data?: Discount[];
// }
