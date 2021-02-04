import { InputType, Field, ObjectType } from "type-graphql";
import { Length, Min, MinLength } from "class-validator";
import messages from "../../constants/messages";
import { ApiResponse } from "../sharedTypes";
import { Clients as Client } from "../../entities/Client";

const {
  NAME_LENGTH_ERROR,
  LAST_NAME_LENGTH_ERROR,
  RAZON_SOCIAL_LENGTH_ERROR,
  CUIT_LENGTH_ERROR,
  IVA_ERROR,
  EMAIL_ERROR,
  PHONE_1_LENGTH_ERROR,
  PHONE_2_LENGTH_ERROR,
  PHONE_3_LENGTH_ERROR,
  ADDRESS_1_LENGTH_ERROR,
  STORE_REQUIRED,
  STATUS_REQUIRED,
} = messages;

@ObjectType()
export class ClientResponse extends ApiResponse {
  @Field(() => Client, { nullable: true })
  data?: Client;
}

@InputType()
export class CreateFields {
  @Field()
  @Length(3, 50, { message: NAME_LENGTH_ERROR })
  name: string;
  @Field()
  @Length(3, 50, { message: LAST_NAME_LENGTH_ERROR })
  last_name: string;
  @Field()
  @Length(3, 50, { message: RAZON_SOCIAL_LENGTH_ERROR })
  razon_social: string;
  @Field()
  @MinLength(11, { message: CUIT_LENGTH_ERROR })
  cuit: string;
  @Field()
  @Length(3, 50, { message: IVA_ERROR })
  iva: string;
  @Field()
  @Length(3, 50, { message: EMAIL_ERROR })
  email: string;
  @Field()
  @MinLength(8, { message: PHONE_1_LENGTH_ERROR })
  phone_1: string;
  @Field({ nullable: true })
  @MinLength(8, { message: PHONE_2_LENGTH_ERROR })
  phone_2: string;
  @Field({ nullable: true })
  @MinLength(8, { message: PHONE_3_LENGTH_ERROR })
  phone_3: string;
  @Field()
  @Length(3, 50, { message: ADDRESS_1_LENGTH_ERROR })
  address_1: string;
  @Field({ nullable: true })
  address_2: string;
  @Field({ nullable: true })
  address_3: string;
  @Field()
  memo: string;
  @Field()
  @Min(1, { message: STORE_REQUIRED })
  storeId: number;
  @Field()
  @Min(1, { message: STATUS_REQUIRED })
  statusId: number;
}
