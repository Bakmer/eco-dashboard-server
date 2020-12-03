import { Arg, Mutation } from "type-graphql";
import { Resolver } from "type-graphql";
import { StoreResponse } from "./types";

import { Stores as Store } from "../entities/Store";

@Resolver(Store)
export class StoreResolver {
  @Mutation(() => StoreResponse)
  async createStore(@Arg("name") name: string): Promise<StoreResponse> {
    try {
      const newStore = await Store.create({ name }).save();

      return { store: newStore };
    } catch (error) {
      return {
        errors: [
          {
            field: "error",
            message: "Hubo un problema al intentar crear la tienda",
          },
        ],
      };
    }
  }
}
