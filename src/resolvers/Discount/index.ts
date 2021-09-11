import { Arg, Mutation, Resolver, Authorized, Query, Ctx } from "type-graphql";
import messages from "../../constants/messages";
import { handleError } from "../../utils";
import {
  CreateDiscountField,
  DiscountResponse,
  ListDiscountResponse,
} from "./types";

import { Discount } from "../../entities/Discount";
import { ADMIN } from "../../constants/roles";
import { MyContext } from "src/types/MyContext";

const { DISCOUNT_CREATED_SUCCESSFULLY, DISCOUNTS_LIST_SUCCESSFUL } = messages;

@Resolver(Discount)
export class DiscountResolver {
  @Mutation(() => DiscountResponse)
  @Authorized(ADMIN)
  async createDiscount(
    @Arg("data") { percentage }: CreateDiscountField,
    @Ctx() { dataSources: { discountService } }: MyContext
  ): Promise<DiscountResponse> {
    try {
      const newDiscount = await discountService.create(percentage);

      return { data: newDiscount, message: DISCOUNT_CREATED_SUCCESSFULLY };
    } catch (error) {
      return handleError(error);
    }
  }

  @Query(() => ListDiscountResponse)
  @Authorized()
  async listDiscounts(
    @Ctx() { dataSources: { discountService } }: MyContext
  ): Promise<ListDiscountResponse> {
    try {
      const discounts = await discountService.list();

      return {
        data: discounts,
        message: DISCOUNTS_LIST_SUCCESSFUL,
      };
    } catch (error) {
      console.log(error);
      return handleError(error);
    }
  }
}
