import { Arg, Mutation, Resolver, Authorized, Query, Ctx } from "type-graphql";
import { CreateStoreFields } from "./types";
import messages from "../../constants/messages";
import { StoreResponse, ListStoresResponse } from "./types";

import { Stores as Store } from "../../entities/Store";
import { ADMIN } from "../../constants/roles";
import { MyContext } from "src/types/MyContext";

const {
  STORE_REGISTER_ERROR,
  STORE_REGISTER_SUCCESS,
  STORES_LIST_SUCCESSFUL,
  GENERIC_ERROR,
} = messages;

@Resolver(Store)
export class StoreResolver {
  @Mutation(() => StoreResponse)
  @Authorized(ADMIN)
  async createStore(
    @Arg("data") data: CreateStoreFields,
    @Ctx() { dataSources: { storeService } }: MyContext
  ): Promise<StoreResponse> {
    try {
      const newStore = await storeService.create(data);

      return { data: newStore, message: STORE_REGISTER_SUCCESS };
    } catch (error) {
      return new Error(STORE_REGISTER_ERROR);
    }
  }

  @Query(() => ListStoresResponse)
  @Authorized()
  async listStores(
    @Ctx() { dataSources: { storeService } }: MyContext
  ): Promise<ListStoresResponse> {
    try {
      const stores = await storeService.list();

      return {
        data: stores,
        message: STORES_LIST_SUCCESSFUL,
      };
    } catch (error) {
      console.log(error);
      return new Error(GENERIC_ERROR);
    }
  }
}
