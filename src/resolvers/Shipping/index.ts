import { Arg, Mutation, Resolver, Authorized, Ctx } from "type-graphql";
import messages from "../../constants/messages";
import { handleError } from "../../utils";
import { CreateShippingFields, ShippingResponse, DeleteShippingFields, UpdateShippingFields } from "./types";
import { ApiResponse } from "../sharedTypes";

import { Shipping } from "../../entities/Shipping";
import { ADMIN } from "../../constants/roles";
import { MyContext } from "src/types/MyContext";

const { PHONE_CREATED_SUCCESSFULLY, DELETE_PHONE_SUCCESS, UPDATE_PHONE_SUCCESS } = messages;

@Resolver(Shipping)
export class ShippingResolver {
  @Mutation(() => ShippingResponse)
  @Authorized(ADMIN)
  async createShipping(
    @Arg("data") data: CreateShippingFields,
    @Ctx() { dataSources: { shippingService } }: MyContext
  ): Promise<ShippingResponse> {
    try {
      const newPhone = await shippingService.create(data);

      return { data: newPhone, message: PHONE_CREATED_SUCCESSFULLY };
    } catch (error) {
      return handleError(error);
    }
  }

  @Mutation(() => ShippingResponse)
  @Authorized()
  async updateShipping(
    @Arg("data") data: UpdateShippingFields,
    @Ctx() { dataSources: { shippingService } }: MyContext
  ): Promise<ShippingResponse> {
    try {
      const updatedPhone = await shippingService.update(data);

      return {
        data: updatedPhone,
        message: UPDATE_PHONE_SUCCESS,
      };
    } catch (error) {
      console.log(error);
      return handleError(error);
    }
  }

  @Mutation(() => ApiResponse)
  @Authorized()
  async deleteShipping(
    @Arg("data") { id }: DeleteShippingFields,
    @Ctx()
    { dataSources: { shippingService } }: MyContext
  ): Promise<ApiResponse> {
    try {
      await shippingService.delete(id);

      return {
        data: { id },
        message: DELETE_PHONE_SUCCESS,
      };
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
