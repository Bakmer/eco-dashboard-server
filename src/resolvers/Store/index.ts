import { Arg, Mutation, Resolver } from "type-graphql";
import { CreateStoreFields } from "./types";
import { ApiResponse } from "../sharedTypes";
import messages from "../../constants/messages";

import { Stores as Store } from "../../entities/Store";

const { STORE_REGISTER_ERROR, STORE_REGISTER_SUCCESS } = messages;

@Resolver(Store)
export class StoreResolver {
  @Mutation(() => ApiResponse)
  async createStore(
    @Arg("data") { name }: CreateStoreFields
  ): Promise<ApiResponse> {
    try {
      const newStore = await Store.create({ name }).save();

      return { data: newStore, message: STORE_REGISTER_SUCCESS };
    } catch (error) {
      return {
        errors: [
          {
            field: "error",
            message: STORE_REGISTER_ERROR,
          },
        ],
      };
    }
  }
}
