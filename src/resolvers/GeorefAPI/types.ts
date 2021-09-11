import { InputType, Field } from "type-graphql";
import { MinLength } from "class-validator";
import messages from "../../constants/messages";

const { GENERIC_ERROR } = messages;

@InputType()
export class IdField {
  @Field()
  @MinLength(1, { message: GENERIC_ERROR })
  id: string;
}

@InputType()
export class ProvinceId {
  @Field()
  @MinLength(1, { message: GENERIC_ERROR })
  province_id: string;
}
