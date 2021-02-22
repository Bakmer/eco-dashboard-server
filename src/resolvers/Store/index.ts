import { Arg, Mutation, Resolver, Authorized, Query, Ctx } from "type-graphql";
import { CreateStoreFields } from "./types";
import messages from "../../constants/messages";
import { StoreResponse, ListStoresResponse } from "./types";
import { handleError } from "../../utils";

import { Store } from "../../entities/Store";
import { ADMIN } from "../../constants/roles";
import { MyContext } from "src/types/MyContext";

const { STORE_REGISTER_SUCCESS, STORES_LIST_SUCCESSFUL } = messages;

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
      return handleError(error);
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
      return handleError(error);
    }
  }
}
