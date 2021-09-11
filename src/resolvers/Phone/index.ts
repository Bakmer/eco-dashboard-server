import { Arg, Mutation, Resolver, Authorized, Ctx } from "type-graphql";
import messages from "../../constants/messages";
import { handleError } from "../../utils";
import { CreatePhoneFields, PhoneResponse, DeletePhoneFields, UpdatePhoneFields } from "./types";
import { ApiResponse } from "../sharedTypes";

import { Phone } from "../../entities/Phone";
import { ADMIN } from "../../constants/roles";
import { MyContext } from "src/types/MyContext";

const { PHONE_CREATED_SUCCESSFULLY, DELETE_PHONE_SUCCESS, UPDATE_PHONE_SUCCESS } = messages;

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

  @Mutation(() => PhoneResponse)
  @Authorized()
  async updatePhone(
    @Arg("data") data: UpdatePhoneFields,
    @Ctx() { dataSources: { phoneService } }: MyContext
  ): Promise<PhoneResponse> {
    try {
      const updatedPhone = await phoneService.update(data);

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
  async deletePhone(
    @Arg("data") { id }: DeletePhoneFields,
    @Ctx()
    { dataSources: { phoneService } }: MyContext
  ): Promise<ApiResponse> {
    try {
      await phoneService.delete(id);

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
