import { Arg, Mutation } from "type-graphql";
import { Resolver } from "type-graphql";
import { ApiResponse } from "./types";
import messages from "../constants/messages";

import { Stores as Store } from "../entities/Store";

const { STORE_REGISTER_ERROR, STORE_REGISTER_SUCCESS } = messages;

@Resolver(Store)
export class StoreResolver {
  @Mutation(() => ApiResponse)
  async createStore(@Arg("name") name: string): Promise<ApiResponse> {
    try {
      const newStore = await Store.create({ name }).save();

      return { data: newStore, errors: null, message: STORE_REGISTER_SUCCESS };
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
