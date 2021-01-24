import { Arg, Mutation, Resolver } from "type-graphql";
import { CreateRolField } from "./types";
import { ApiResponse } from "../sharedTypes";
import messages from "../../constants/messages";

import { Stores as Store } from "../../entities/Store";

const { ROLE_CREATED_SUCCESSFULLY, GENERIC_ERROR } = messages;

@Resolver(Store)
export class StoreResolver {
  @Mutation(() => ApiResponse)
  async createRole(
    @Arg("data") { name }: CreateRolField
  ): Promise<ApiResponse> {
    try {
      const newRole = await Store.create({ name }).save();

      return { data: newRole, message: ROLE_CREATED_SUCCESSFULLY };
    } catch (error) {
      return {
        errors: [
          {
            field: "error",
            message: GENERIC_ERROR,
          },
        ],
      };
    }
  }
}
