import { Arg, Mutation, Resolver, Authorized, Query } from "type-graphql";
import { CreateStoreFields } from "./types";
import { getConnection } from "typeorm";
import messages from "../../constants/messages";
import { StoreResponse, ListStoresResponse } from "./types";

import { Stores as Store } from "../../entities/Store";
import { ADMIN } from "../../constants/roles";

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
    @Arg("data") { name }: CreateStoreFields
  ): Promise<StoreResponse> {
    try {
      const newStore = await Store.create({ name }).save();

      return { data: newStore, message: STORE_REGISTER_SUCCESS };
    } catch (error) {
      return new Error(STORE_REGISTER_ERROR);
    }
  }

  @Query(() => ListStoresResponse)
  @Authorized()
  async listStores(): Promise<ListStoresResponse> {
    try {
      const stores = await getConnection()
        .createQueryBuilder()
        .select("store")
        .from(Store, "store")
        .leftJoinAndSelect("store.users", "users")
        .getMany();

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
