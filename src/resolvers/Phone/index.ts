import { Arg, Mutation, Resolver, Authorized, Ctx } from "type-graphql";
import messages from "../../constants/messages";
import { handleError } from "../../utils";
import { CreatePhoneFields, PhoneResponse } from "./types";

import { Phone } from "../../entities/Phone";
import { ADMIN } from "../../constants/roles";
import { MyContext } from "src/types/MyContext";

const { PHONE_CREATED_SUCCESSFULLY } = messages;

@Resolver(Phone)
export class PhoneResolver {
  @Mutation(() => PhoneResponse)
  @Authorized(ADMIN)
  async createPhone(
    @Arg("data") data: CreatePhoneFields,
    @Ctx() { dataSources: { phoneService } }: MyContext
  ): Promise<PhoneResponse> {
    try {
      const newPhone = await phoneService.create(data);

      return { data: newPhone, message: PHONE_CREATED_SUCCESSFULLY };
    } catch (error) {
      return handleError(error);
    }
  }

  //   @Query(() => ListDiscountResponse)
  //   @Authorized()
  //   async listDiscounts(
  //     @Ctx() { dataSources: { discountService } }: MyContext
  //   ): Promise<ListDiscountResponse> {
  //     try {
  //       const discounts = await discountService.list();

  //       return {
  //         data: discounts,
  //         message: DISCOUNTS_LIST_SUCCESSFUL,
  //       };
  //     } catch (error) {
  //       console.log(error);
  //       return handleError(error);
  //     }
  //   }
}
